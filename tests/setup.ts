import { db } from "../src/db/setup";
import { users, subscriptions, userAccounts, transactions, payments, wallets, categories } from "../src/db/schema";
import { sql } from "drizzle-orm";

export async function cleanup() {
  // Disable foreign key checks to make cleanup easier
  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0`);
  
  await db.delete(transactions);
  await db.delete(payments);
  await db.delete(userAccounts);
  await db.delete(subscriptions);
  await db.delete(users);
  
  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);
}

export async function seedMasterData() {
  // Ensure wallets and categories exist
  const existingWallets = await db.select().from(wallets);
  if (existingWallets.length === 0) {
    await db.insert(wallets).values([
      { name: "Cash", type: "CASH" },
      { name: "BCA", type: "BANK" },
      { name: "Mandiri", type: "BANK" },
      { name: "Gopay", type: "E_WALLET" },
      { name: "OVO", type: "E_WALLET" },
    ]);
  }

  const existingCategories = await db.select().from(categories);
  if (existingCategories.length === 0) {
    await db.insert(categories).values([
      { name: "Gaji", type: "INCOME" },
      { name: "Bonus", type: "INCOME" },
      { name: "Investasi", type: "INCOME" },
      { name: "Food", type: "EXPENSE" },
      { name: "Keperluan Rumah", type: "EXPENSE" },
      { name: "Transportasi", type: "EXPENSE" },
      { name: "Hiburan", type: "EXPENSE" },
      { name: "Kesehatan", type: "EXPENSE" },
    ]);
  }
}
