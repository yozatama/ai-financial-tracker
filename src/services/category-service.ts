import { db } from "../db/setup";
import { categories } from "../db/schema";

export const CategoryService = {
  async getAll() {
    return await db.select().from(categories);
  }
};
