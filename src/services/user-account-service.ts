import { db } from "../db/setup";
import { userAccounts, wallets, subscriptions } from "../db/schema";
import { eq, and } from "drizzle-orm";

export const UserAccountService = {
  async getAllByUserId(userId: string) {
    return await db
      .select({
        id: userAccounts.id,
        accountNumber: userAccounts.accountNumber,
        balance: userAccounts.balance,
        createdAt: userAccounts.createdAt,
        wallet: {
          id: wallets.id,
          name: wallets.name,
          type: wallets.type,
        }
      })
      .from(userAccounts)
      .innerJoin(wallets, eq(userAccounts.walletId, wallets.id))
      .where(eq(userAccounts.userId, userId));
  },

  async getById(id: string, userId: string) {
    const result = await db
      .select({
        id: userAccounts.id,
        accountNumber: userAccounts.accountNumber,
        balance: userAccounts.balance,
        createdAt: userAccounts.createdAt,
        wallet: {
          id: wallets.id,
          name: wallets.name,
          type: wallets.type,
        }
      })
      .from(userAccounts)
      .innerJoin(wallets, eq(userAccounts.walletId, wallets.id))
      .where(and(eq(userAccounts.id, id), eq(userAccounts.userId, userId)))
      .limit(1);

    if (result.length === 0) {
      throw new Error("User account not found");
    }

    return result[0];
  },

  async create(userId: string, data: any) {
    // Check subscription plan limit
    const subResult = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId)).limit(1);
    const planType = subResult.length > 0 ? subResult[0].planType : 'FREE';

    if (planType === 'FREE') {
      const existingAccounts = await this.getAllByUserId(userId);
      if (existingAccounts.length >= 2) {
        throw new Error("FREE plan is limited to 2 accounts. Please upgrade to PRO.");
      }
    }

    const newId = crypto.randomUUID();
    await db.insert(userAccounts).values({
      id: newId,
      userId: userId,
      walletId: data.walletId,
      accountNumber: data.accountNumber,
      balance: data.initialBalance || "0",
    });

    return await this.getById(newId, userId);
  },

  async update(id: string, userId: string, data: any) {
    const account = await this.getById(id, userId); // check if exists and owned by user
    
    await db.update(userAccounts)
      .set({ accountNumber: data.accountNumber })
      .where(eq(userAccounts.id, id));
    
    return await this.getById(id, userId);
  },

  async delete(id: string, userId: string) {
    await this.getById(id, userId); // check if exists and owned by user
    
    await db.delete(userAccounts).where(eq(userAccounts.id, id));
    return { status: "success" };
  }
};
