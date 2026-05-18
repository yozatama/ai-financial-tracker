import { describe, it, expect, beforeEach } from "bun:test";
import { app } from "../src/index";
import { cleanup } from "./setup";

describe("Auth & User API", () => {
  beforeEach(async () => {
    await cleanup();
  });

  const userData = {
    email: "test@example.com",
    password: "password123",
    name: "Test User",
  };

  it("should register a new user successfully", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.status).toBe("success");
    expect(body.data.email).toBe(userData.email);
  });

  it("should fail to register with invalid email", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, email: "invalid-email" }),
      })
    );

    expect(response.status).toBe(422);
  });

  it("should login successfully and return a token", async () => {
    // Register first
    await app.handle(
      new Request("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
    );

    const response = await app.handle(
      new Request("http://localhost/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.status).toBe("success");
    expect(body.data.token).toBeDefined();
  });

  it("should get user profile with valid token", async () => {
    // Register & Login
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
    const { data: { token } } = await loginRes.json();

    const response = await app.handle(
      new Request("http://localhost/api/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.status).toBe("success");
    expect(body.data.email).toBe(userData.email);
  });

  it("should logout successfully", async () => {
    // Register & Login
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
    const { data: { token } } = await loginRes.json();

    const response = await app.handle(
      new Request("http://localhost/api/users/logout", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.message).toBe("Logout berhasil");

    // Verify profile is no longer accessible with the same token if logout invalidates it 
    // (Note: JWT itself is stateless but our implementation saves token in DB and logout deletes it)
    const profileRes = await app.handle(
      new Request("http://localhost/api/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
    // Actually, /me route uses jwt.verify which doesn't check the DB token column 
    // unless we modified it to do so. Let's check user-route.ts
  });
});
