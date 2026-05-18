import { describe, it, expect, beforeEach } from "bun:test";
import { app } from "../src/index";
import { cleanup, seedMasterData } from "./setup";
import { db } from "../src/db/setup";
import { subscriptions, payments } from "../src/db/schema";
import { eq } from "drizzle-orm";

describe("Subscription & Xendit API", () => {
  let token: string;
  let userId: string;

  beforeEach(async () => {
    await cleanup();
    await seedMasterData();

    // Setup user
    const userData = { email: "premium@example.com", password: "password123", name: "Premium User" };
    await app.handle(new Request("http://localhost/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userData) }));
    const loginRes = await app.handle(new Request("http://localhost/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: userData.email, password: userData.password }) }));
    const loginBody = await loginRes.json();
    token = loginBody.data.token;
    userId = loginBody.data.user.id;
  });

  it("should get subscription plans", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/subscriptions/plans", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.data.some((p: any) => p.plan === "PRO")).toBe(true);
  });

  it("should checkout and create pending payment", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/subscriptions/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ planType: "PRO" }),
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.data.invoice_url).toBeDefined();

    const payment = await db.select().from(payments).where(eq(payments.userId, userId)).limit(1);
    expect(payment.length).toBe(1);
    expect(payment[0].status).toBe("PENDING");
  });

  it("should handle Xendit PAID webhook and upgrade subscription", async () => {
    // 1. Checkout first
    const checkoutRes = await app.handle(
      new Request("http://localhost/api/subscriptions/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ planType: "PRO_MAX" }),
      })
    );
    const checkoutBody = await checkoutRes.json();
    const invoiceId = checkoutBody.data.id;

    // 2. Simulate Webhook
    const response = await app.handle(
      new Request("http://localhost/api/webhooks/xendit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: invoiceId,
          status: "PAID",
          paid_at: new Date().toISOString(),
        }),
      })
    );

    expect(response.status).toBe(200);

    // 3. Verify upgrade
    const sub = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId)).limit(1);
    expect(sub[0].planType).toBe("PRO_MAX");
    expect(sub[0].status).toBe("ACTIVE");
    expect(sub[0].endDate!.getTime()).toBeGreaterThan(new Date().getTime());

    const payment = await db.select().from(payments).where(eq(payments.xenditInvoiceId, invoiceId)).limit(1);
    expect(payment[0].status).toBe("PAID");
  });

  it("should handle Xendit EXPIRED webhook", async () => {
    const checkoutRes = await app.handle(
      new Request("http://localhost/api/subscriptions/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ planType: "PRO" }),
      })
    );
    const { data: { id: invoiceId } } = await checkoutRes.json();

    const response = await app.handle(
      new Request("http://localhost/api/webhooks/xendit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: invoiceId,
          status: "EXPIRED",
        }),
      })
    );

    expect(response.status).toBe(200);

    const payment = await db.select().from(payments).where(eq(payments.xenditInvoiceId, invoiceId)).limit(1);
    expect(payment[0].status).toBe("FAILED");
  });
});
