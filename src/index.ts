import { Elysia } from "elysia";
import { db } from "./db/setup";
import { sql } from "drizzle-orm";
import { userRoute } from "./routes/user-route";
import { masterRoute } from "./routes/master-route";
import { userAccountRoute } from "./routes/user-account-route";
import { transactionRoute } from "./routes/transaction-route";
import { subscriptionRoute } from "./routes/subscription-route";

export const app = new Elysia();

app.use(userRoute);
app.use(masterRoute);
app.use(userAccountRoute);
app.use(transactionRoute);
app.use(subscriptionRoute);

app.get("/", () => {
  return {
    app: "AI Financial Tracker API",
    version: "1.0.0",
    description: "Welcome to the API. Access /ping to check database status.",
  };
});

app.get("/ping", async () => {
  let dbStatus = "connected";
  try {
    // Run a simple query to verify database connection pool setup and reachability
    await db.execute(sql`SELECT 1`);
  } catch (error) {
    dbStatus = `disconnected (${(error as Error).message})`;
  }

  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    database: dbStatus,
  };
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(port, () => {
  console.log(`🦊 Elysia server is running at http://localhost:${port}`);
});
