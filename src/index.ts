import { Elysia } from "elysia";
import { db } from "./db/setup";
import { sql } from "drizzle-orm";

const app = new Elysia();

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
