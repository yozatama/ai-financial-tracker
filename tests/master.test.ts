import { describe, it, expect, beforeEach } from "bun:test";
import { app } from "../src/index";
import { cleanup, seedMasterData } from "./setup";

describe("Master Data API", () => {
  let token: string;

  beforeEach(async () => {
    await cleanup();
    await seedMasterData();

    // Register & Login to get token
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
  });

  it("should get all wallets", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/wallets", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.status).toBe("success");
    expect(body.data.length).toBeGreaterThan(0);
  });

  it("should get all categories", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/categories", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.status).toBe("success");
    expect(body.data.length).toBeGreaterThan(0);
  });

  it("should fail to get wallets without token", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/wallets", {
        method: "GET",
      })
    );

    expect(response.status).toBe(401);
  });
});
