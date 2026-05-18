import { db } from "../db/setup";
import { wallets } from "../db/schema";

export const WalletService = {
  async getAll() {
    return await db.select().from(wallets);
  }
};
