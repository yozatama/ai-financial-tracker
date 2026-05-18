import { db } from "../db/setup";
import { users, subscriptions } from "../db/schema";
import { eq } from "drizzle-orm";

export const UserService = {
  async register(data: any) {
    const existingUser = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
    if (existingUser.length > 0) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await Bun.password.hash(data.password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    // Create user and assign FREE subscription in a transaction
    return await db.transaction(async (tx) => {
      await tx.insert(users).values({
        email: data.email,
        password: hashedPassword,
        name: data.name,
      });

      const newUser = await tx.select().from(users).where(eq(users.email, data.email)).limit(1);
      const user = newUser[0];

      // Assign FREE subscription plan
      await tx.insert(subscriptions).values({
        userId: user.id,
        planType: 'FREE',
        status: 'ACTIVE',
      });

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    });
  },

  async login(data: any) {
    const userResult = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
    if (userResult.length === 0) {
      throw new Error("Invalid email or password");
    }

    const user = userResult[0];
    const isMatch = await Bun.password.verify(data.password, user.password);
    
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  },

  async saveToken(userId: string, token: string) {
    await db.update(users).set({ token }).where(eq(users.id, userId));
  },

  async logout(token: string) {
    const userResult = await db.select().from(users).where(eq(users.token, token)).limit(1);
    if (userResult.length === 0) {
      throw new Error("Token tidak valid atau pengguna belum login");
    }
    await db.update(users).set({ token: null }).where(eq(users.id, userResult[0].id));
  },

  async getProfile(userId: string) {
    const userResult = await db.select({
      id: users.id,
      email: users.email,
      name: users.name,
      profilePicture: users.profilePicture,
      createdAt: users.createdAt,
    }).from(users).where(eq(users.id, userId)).limit(1);

    if (userResult.length === 0) {
      throw new Error("User not found");
    }

    return userResult[0];
  }
};
