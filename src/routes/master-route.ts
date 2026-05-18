import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { WalletService } from "../services/wallet-service";
import { CategoryService } from "../services/category-service";

const jwtSecret = process.env.JWT_SECRET || "super-secret-key-for-dev";

export const masterRoute = new Elysia({ prefix: "/api" })
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
  .get("/wallets", async () => {
    const wallets = await WalletService.getAll();
    return {
      status: "success",
      data: wallets,
    };
  })
  .get("/categories", async () => {
    const categories = await CategoryService.getAll();
    return {
      status: "success",
      data: categories,
    };
  });
