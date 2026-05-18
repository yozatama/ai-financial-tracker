import { db } from "../db/setup";
import { subscriptions, payments, users } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { XenditService } from "./xendit-service";

export const SubscriptionService = {
  async getMySubscription(userId: string) {
    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1);

    if (result.length === 0) {
      throw new Error("Subscription not found");
    }

    return result[0];
  },

  async checkout(userId: string, planType: 'PRO' | 'PRO_MAX') {
    const userResult = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (userResult.length === 0) throw new Error("User not found");
    const user = userResult[0];

    const sub = await this.getMySubscription(userId);
    
    let amount = 0;
    if (planType === 'PRO') amount = 50000; // e.g. 50k IDR
    if (planType === 'PRO_MAX') amount = 100000; // e.g. 100k IDR

    const externalId = `sub_${userId}_${Date.now()}`;
    const invoice = await XenditService.createInvoice(
      externalId,
      amount,
      user.email,
      `Subscription for ${planType} plan`
    );

    // Record payment attempt
    await db.insert(payments).values({
      userId: userId,
      subscriptionId: sub.id,
      xenditInvoiceId: invoice.id,
      amount: amount.toString(),
      status: 'PENDING',
    });

    return invoice;
  },

  async handleWebhook(invoiceId: string, status: string, paidAt?: string) {
    // Find payment
    const paymentResult = await db.select().from(payments).where(eq(payments.xenditInvoiceId, invoiceId)).limit(1);
    if (paymentResult.length === 0) return; // ignore unknown invoice

    const payment = paymentResult[0];

    if (status === 'PAID' || status === 'SETTLED') {
      await db.transaction(async (tx) => {
        await tx.update(payments).set({
          status: 'PAID',
          paidAt: paidAt ? new Date(paidAt) : new Date(),
        }).where(eq(payments.id, payment.id));

        // Determine plan based on amount for simplicity, or we could store planType in payment/metadata
        const amount = parseFloat(payment.amount as unknown as string);
        const planType = amount >= 100000 ? 'PRO_MAX' : 'PRO';

        // Extend 30 days
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);

        await tx.update(subscriptions).set({
          planType: planType,
          status: 'ACTIVE',
          startDate: startDate,
          endDate: endDate,
        }).where(eq(subscriptions.id, payment.subscriptionId));
      });
    } else if (status === 'EXPIRED' || status === 'FAILED') {
      await db.transaction(async (tx) => {
        await tx.update(payments).set({
          status: 'FAILED',
        }).where(eq(payments.id, payment.id));

        // Fallback to FREE if current subscription is expired (handled safely here or via cron job)
        const subResult = await tx.select().from(subscriptions).where(eq(subscriptions.id, payment.subscriptionId)).limit(1);
        if (subResult.length > 0) {
          const sub = subResult[0];
          // If the sub is already inactive/expired, fallback to FREE immediately
          if (sub.endDate && sub.endDate < new Date()) {
            await tx.update(subscriptions).set({
              planType: 'FREE',
              status: 'ACTIVE',
            }).where(eq(subscriptions.id, sub.id));
          }
        }
      });
    }
  }
};
