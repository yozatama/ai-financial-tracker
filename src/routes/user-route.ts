import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { UserService } from "../services/user-service";

const jwtSecret = process.env.JWT_SECRET || "super-secret-key-for-dev";

export const userRoute = new Elysia({ prefix: "/api" })
  .use(
    jwt({
      name: "jwt",
      secret: jwtSecret,
    })
  )
  .group("/auth", (app) => // Keeping /auth for login/register as defined previously
    app
      .post(
        "/register",
        async ({ body, set }) => {
          try {
            const user = await UserService.register(body);
            return {
              status: "success",
              data: user,
            };
          } catch (error: any) {
            set.status = 400;
            return {
              status: "error",
              message: error.message,
            };
          }
        },
        {
          body: t.Object({
            email: t.String({ format: "email" }),
            password: t.String({ minLength: 6 }),
            name: t.String(),
          }),
        }
      )
      .post(
        "/login",
        async ({ jwt, body, set }) => {
          try {
            const user = await UserService.login(body);
            
            // Generate token
            const token = await jwt.sign({
              id: user.id,
              email: user.email,
            });

            // Save token to database
            await UserService.saveToken(user.id, token);

            return {
              status: "success",
              data: {
                user,
                token,
              },
            };
          } catch (error: any) {
            set.status = 401;
            return {
              status: "error",
              message: error.message,
            };
          }
        },
        {
          body: t.Object({
            email: t.String({ format: "email" }),
            password: t.String(),
          }),
        }
      )
  )
  .group("/users", (app) =>
    app
      .get("/me", async ({ jwt, headers, set }) => {
        const authHeader = headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          set.status = 401;
          return { status: "error", message: "Unauthorized" };
        }

        const token = authHeader.split(" ")[1];
        const payload = await jwt.verify(token);

        if (!payload) {
          set.status = 401;
          return { status: "error", message: "Unauthorized" };
        }

        try {
          const user = await UserService.getProfile(payload.id as string);
          return {
            status: "success",
            data: user,
          };
        } catch (error: any) {
          set.status = 404;
          return {
            status: "error",
            message: error.message,
          };
        }
      })
      .delete("/logout", async ({ headers, set }) => {
        const authHeader = headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          set.status = 401;
          return { status: "error", message: "Token tidak valid atau pengguna belum login" };
        }

        const token = authHeader.split(" ")[1];

        try {
          await UserService.logout(token);
          return {
            status: "success",
            message: "Logout berhasil"
          };
        } catch (error: any) {
          set.status = 401;
          return {
            status: "error",
            message: error.message
          };
        }
      })
  );
