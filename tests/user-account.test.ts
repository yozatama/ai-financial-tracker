import { describe, it, expect, beforeEach } from "bun:test";
import { app } from "../src/index";
import { cleanup, seedMasterData } from "./setup";

describe("User Account API", () => {
  let token: string;
  let walletId: string;

  beforeEach(async () => {
    await cleanup();
    await seedMasterData();

    // Register & Login
    const userData = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    };
    await app.handle(
      new Request("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
    );
    const loginRes = await app.handle(
      new Request("http://localhost/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      })
    );
    const body = await loginRes.json();
    token = body.data.token;

    // Get a wallet ID
    const walletRes = await app.handle(
      new Request("http://localhost/api/wallets", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
    );
    const wallets = await walletRes.json();
    walletId = wallets.data[0].id;
  });

  it("should create a user account successfully", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/user-accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          walletId: walletId,
          accountNumber: "1234567890",
          initialBalance: "100000",
        }),
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.status).toBe("success");
    expect(body.data.accountNumber).toBe("1234567890");
  });

  it("should enforce account limit for FREE plan", async () => {
    // Create 2 accounts
    for (let i = 0; i < 2; i++) {
      await app.handle(
        new Request("http://localhost/api/user-accounts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            walletId: walletId,
            accountNumber: `acc-${i}`,
          }),
        })
      );
    }

    // Try creating the 3rd one
    const response = await app.handle(
      new Request("http://localhost/api/user-accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          walletId: walletId,
          accountNumber: "acc-3",
        }),
      })
    );

    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.message).toContain("FREE plan is limited to 2 accounts");
  });

  it("should get user accounts", async () => {
    // Create one first
    await app.handle(
      new Request("http://localhost/api/user-accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          walletId: walletId,
          accountNumber: "12345",
        }),
      })
    );

    const response = await app.handle(
      new Request("http://localhost/api/user-accounts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.data.length).toBe(1);
  });

  it("should delete a user account", async () => {
    // Create one
    const createRes = await app.handle(
      new Request("http://localhost/api/user-accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          walletId: walletId,
          accountNumber: "to-delete",
        }),
      })
    );
    const { data: { id } } = await createRes.json();

    const response = await app.handle(
      new Request(`http://localhost/api/user-accounts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.message).toBe("Account deleted successfully");
  });
});
