import { describe, it, expect, beforeEach, spyOn } from "bun:test";
import { app } from "../src/index";
import { cleanup, seedMasterData } from "./setup";

describe("Transaction API", () => {
  let token: string;
  let userAccountId: string;
  let categoryId: string;

  beforeEach(async () => {
    await cleanup();
    await seedMasterData();

    // Setup user, account, and category
    const userData = { email: "test@example.com", password: "password123", name: "Test User" };
    await app.handle(new Request("http://localhost/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userData) }));
    const loginRes = await app.handle(new Request("http://localhost/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: userData.email, password: userData.password }) }));
    const loginBody = await loginRes.json();
    token = loginBody.data.token;

    const walletRes = await app.handle(new Request("http://localhost/api/wallets", { method: "GET", headers: { Authorization: `Bearer ${token}` } }));
    const wallets = await walletRes.json();
    const walletId = wallets.data[0].id;

    const accountRes = await app.handle(new Request("http://localhost/api/user-accounts", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ walletId, accountNumber: "123", initialBalance: "1000" }) }));
    const accountBody = await accountRes.json();
    userAccountId = accountBody.data.id;

    const categoryRes = await app.handle(new Request("http://localhost/api/categories", { method: "GET", headers: { Authorization: `Bearer ${token}` } }));
    const categories = await categoryRes.json();
    categoryId = categories.data.find((c: any) => c.type === "EXPENSE").id;
  });

  it("should create an EXPENSE transaction and decrease balance", async () => {
    const amount = 500;
    const response = await app.handle(
      new Request("http://localhost/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          userAccountId,
          categoryId,
          amount,
          type: "EXPENSE",
          date: new Date().toISOString(),
          notes: "Buying food",
        }),
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.status).toBe("success");
    expect(parseFloat(body.data.newBalance)).toBe(500); // 1000 - 500
  });

  it("should create an INCOME transaction and increase balance", async () => {
    const amount = 2000;
    const incCategoryId = (await (await app.handle(new Request("http://localhost/api/categories", { method: "GET", headers: { Authorization: `Bearer ${token}` } }))).json()).data.find((c: any) => c.type === "INCOME").id;

    const response = await app.handle(
      new Request("http://localhost/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          userAccountId,
          categoryId: incCategoryId,
          amount,
          type: "INCOME",
          date: new Date().toISOString(),
          notes: "Salary",
        }),
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(parseFloat(body.data.newBalance)).toBe(3000); // 1000 + 2000
  });

  it("should delete a transaction and revert balance", async () => {
    // Create first
    const createRes = await app.handle(
      new Request("http://localhost/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          userAccountId,
          categoryId,
          amount: 100,
          type: "EXPENSE",
          date: new Date().toISOString(),
        }),
      })
    );
    const { data: { id } } = await createRes.json();

    // Delete
    const response = await app.handle(
      new Request(`http://localhost/api/transactions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    expect(response.status).toBe(200);

    // Verify balance is back to 1000
    const accountRes = await app.handle(
      new Request(`http://localhost/api/user-accounts/${userAccountId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
    );
    const accountBody = await accountRes.json();
    expect(parseFloat(accountBody.data.balance)).toBe(1000);
  });

  it("should handle AI parse and create transaction", async () => {
    process.env.GEMINI_API_KEY = "dummy-key";
    // Mock global fetch for Gemini API
    const originalFetch = global.fetch;
    global.fetch = async (url: any) => {
      if (url.toString().includes("generativelanguage.googleapis.com")) {
        return new Response(JSON.stringify({
          candidates: [{ content: { parts: [{ text: JSON.stringify({
            amount: 50000,
            type: "EXPENSE",
            categoryId: categoryId,
            notes: "Jajan bakso"
          }) }] } }]
        }), { status: 200 });
      }
      return originalFetch(url);
    };

    const response = await app.handle(
      new Request("http://localhost/api/transactions/ai-parse", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          input: "beli bakso 50rb",
          userAccountId: userAccountId,
        }),
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(parseFloat(body.data.amount)).toBe(50000);
    expect(parseFloat(body.data.newBalance)).toBe(-49000); // 1000 - 50000

    // Restore fetch
    global.fetch = originalFetch;
  });
});
