import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { TransactionService } from "../services/transaction-service";

const jwtSecret = process.env.JWT_SECRET || "super-secret-key-for-dev";

export const transactionRoute = new Elysia({ prefix: "/api/transactions" })
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
    const records = await TransactionService.getAllByUserId(user!.id);
    return { status: "success", data: records };
  })
  .post(
    "/",
    async ({ user, body, set }) => {
      try {
        const record = await TransactionService.create(user!.id, body);
        return { status: "success", data: record };
      } catch (error: any) {
        set.status = 400;
        return { status: "error", message: error.message };
      }
    },
    {
      body: t.Object({
        userAccountId: t.String(),
        categoryId: t.String(),
        amount: t.Numeric(),
        type: t.String(),
        date: t.String(),
        notes: t.Optional(t.String()),
      }),
    }
  )
  .post(
    "/ai-parse",
    async ({ user, body, set }) => {
      try {
        const parsedData = await TransactionService.parseWithAI(user!.id, body.input);
        
        // Auto-create transaction using parsed data
        // Assume user passes default `userAccountId` and `date` in body since AI only extracts amount/type/category
        const fullData = {
          ...parsedData,
          userAccountId: body.userAccountId,
          date: body.date || new Date().toISOString(),
        };

        const record = await TransactionService.create(user!.id, fullData);

        return { status: "success", data: record, ai_parsed: parsedData };
      } catch (error: any) {
        set.status = 400;
        return { status: "error", message: error.message };
      }
    },
    {
      body: t.Object({
        input: t.String(),
        userAccountId: t.String(),
        date: t.Optional(t.String()),
      }),
    }
  )
  .get("/:id", async ({ user, params, set }) => {
    try {
      const record = await TransactionService.getById(params.id, user!.id);
      return { status: "success", data: record };
    } catch (error: any) {
      set.status = 404;
      return { status: "error", message: error.message };
    }
  })
  .delete("/:id", async ({ user, params, set }) => {
    try {
      await TransactionService.delete(params.id, user!.id);
      return { status: "success", message: "Transaction deleted successfully" };
    } catch (error: any) {
      set.status = 400;
      return { status: "error", message: error.message };
    }
  });
