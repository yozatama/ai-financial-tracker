import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { UserAccountService } from "../services/user-account-service";

const jwtSecret = process.env.JWT_SECRET || "super-secret-key-for-dev";

export const userAccountRoute = new Elysia({ prefix: "/api/user-accounts" })
  .use(
    jwt({
      name: "jwt",
      secret: jwtSecret,
    })
  )
  .derive(async ({ jwt, headers, set }) => {
    const authHeader = headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      set.status = 401;
      return { user: null };
    }

    const token = authHeader.split(" ")[1];
    const payload = await jwt.verify(token);

    if (!payload) {
      set.status = 401;
      return { user: null };
    }

    return { user: payload as { id: string; email: string } };
  })
  .onBeforeHandle(({ user, set }) => {
    if (!user) {
      set.status = 401;
      return { status: "error", message: "Unauthorized" };
    }
  })
  .get("/", async ({ user }) => {
    const accounts = await UserAccountService.getAllByUserId(user!.id);
    return { status: "success", data: accounts };
  })
  .post(
    "/",
    async ({ user, body, set }) => {
      try {
        const account = await UserAccountService.create(user!.id, body);
        return { status: "success", data: account };
      } catch (error: any) {
        set.status = 400;
        return { status: "error", message: error.message };
      }
    },
    {
      body: t.Object({
        walletId: t.String(),
        accountNumber: t.Optional(t.String()),
        initialBalance: t.Optional(t.String()), // Accepting string to avoid precision loss, though we use decimal
      }),
    }
  )
  .get("/:id", async ({ user, params, set }) => {
    try {
      const account = await UserAccountService.getById(params.id, user!.id);
      return { status: "success", data: account };
    } catch (error: any) {
      set.status = 404;
      return { status: "error", message: error.message };
    }
  })
  .put(
    "/:id",
    async ({ user, params, body, set }) => {
      try {
        const account = await UserAccountService.update(params.id, user!.id, body);
        return { status: "success", data: account };
      } catch (error: any) {
        set.status = 400;
        return { status: "error", message: error.message };
      }
    },
    {
      body: t.Object({
        accountNumber: t.String(),
      }),
    }
  )
  .delete("/:id", async ({ user, params, set }) => {
    try {
      await UserAccountService.delete(params.id, user!.id);
      return { status: "success", message: "Account deleted successfully" };
    } catch (error: any) {
      set.status = 400;
      return { status: "error", message: error.message };
    }
  });
