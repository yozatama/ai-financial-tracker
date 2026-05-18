import { db } from "./setup";
import { wallets, categories } from "./schema";

async function seed() {
  console.log("Seeding data...");

  // Seed Wallets
  await db.insert(wallets).values([
    { name: "Cash", type: "CASH" },
    { name: "BCA", type: "BANK" },
    { name: "Mandiri", type: "BANK" },
    { name: "Gopay", type: "E_WALLET" },
    { name: "OVO", type: "E_WALLET" },
  ]);
  console.log("Seeded wallets.");

  // Seed Categories
  await db.insert(categories).values([
    // INCOME
    { name: "Gaji", type: "INCOME" },
    { name: "Bonus", type: "INCOME" },
    { name: "Investasi", type: "INCOME" },
    
    // EXPENSE
    { name: "Food", type: "EXPENSE" },
    { name: "Keperluan Rumah", type: "EXPENSE" },
    { name: "Transportasi", type: "EXPENSE" },
    { name: "Hiburan", type: "EXPENSE" },
    { name: "Kesehatan", type: "EXPENSE" },
  ]);
  console.log("Seeded categories.");

  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seeding failed:");
  console.error(e);
  process.exit(1);
});
