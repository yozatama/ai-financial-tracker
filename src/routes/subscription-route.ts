import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { SubscriptionService } from "../services/subscription-service";

const jwtSecret = process.env.JWT_SECRET || "super-secret-key-for-dev";

// Auth middleware plugin
const authPlugin = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: jwtSecret,
      })
    )
    .derive(async ({ jwt, headers, set }) => {
      const authHeader = headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return { user: null };
      }

      const token = authHeader.split(" ")[1];
      const payload = await jwt.verify(token);

      if (!payload) {
        return { user: null };
      }

      return { user: payload as { id: string; email: string } };
    });

export const subscriptionRoute = new Elysia({ prefix: "/api" })
  // Webhook does not need auth (but should verify signature in real world)
  .post(
    "/webhooks/xendit",
    async ({ body, set }) => {
      try {
        const payload = body as any;
        // In real app, verify X-CALLBACK-TOKEN
        const invoiceId = payload.id;
        const status = payload.status;
        const paidAt = payload.paid_at;
        
        await SubscriptionService.handleWebhook(invoiceId, status, paidAt);
        return { status: "success" };
      } catch (error: any) {
        set.status = 400;
        return { status: "error", message: error.message };
      }
    }
  )
  .group("/subscriptions", (app) =>
    app
      .use(authPlugin)
      .onBeforeHandle(({ user, set }) => {
        if (!user) {
          set.status = 401;
          return { status: "error", message: "Unauthorized" };
        }
      })
      .get("/plans", () => {
        return {
          status: "success",
          data: [
            { plan: "FREE", price: 0, maxAccounts: 2 },
            { plan: "PRO", price: 50000, maxAccounts: "unlimited" },
            { plan: "PRO_MAX", price: 100000, maxAccounts: "unlimited" },
          ],
        };
      })
      .get("/me", async ({ user, set }) => {
        try {
          const sub = await SubscriptionService.getMySubscription(user!.id);
          return { status: "success", data: sub };
        } catch (error: any) {
          set.status = 404;
          return { status: "error", message: error.message };
        }
      })
      .post(
        "/checkout",
        async ({ user, body, set }) => {
          try {
            const invoice = await SubscriptionService.checkout(user!.id, body.planType as any);
            return { status: "success", data: invoice };
          } catch (error: any) {
            set.status = 400;
            return { status: "error", message: error.message };
          }
        },
        {
          body: t.Object({
            planType: t.String({ default: 'PRO' }),
          }),
        }
      )
  );
