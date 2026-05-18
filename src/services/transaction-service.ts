import { db } from "../db/setup";
import { transactions, userAccounts, categories } from "../db/schema";
import { eq, and, desc } from "drizzle-orm";

export const TransactionService = {
  async getAllByUserId(userId: string) {
    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.date));
  },

  async getById(id: string, userId: string) {
    const result = await db
      .select()
      .from(transactions)
      .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
      .limit(1);

    if (result.length === 0) {
      throw new Error("Transaction not found");
    }

    return result[0];
  },

  async create(userId: string, data: any) {
    const newId = crypto.randomUUID();
    
    return await db.transaction(async (tx) => {
      // 1. Get current account balance
      const accountResult = await tx
        .select()
        .from(userAccounts)
        .where(and(eq(userAccounts.id, data.userAccountId), eq(userAccounts.userId, userId)))
        .limit(1);

      if (accountResult.length === 0) {
        throw new Error("User account not found");
      }

      const account = accountResult[0];
      const amount = parseFloat(data.amount);
      let newBalance = parseFloat(account.balance as unknown as string);

      // 2. Calculate new balance
      if (data.type === "INCOME") {
        newBalance += amount;
      } else if (data.type === "EXPENSE") {
        newBalance -= amount;
      } else {
        throw new Error("Invalid transaction type for direct creation. Use transfer logic instead.");
      }

      // 3. Insert transaction
      await tx.insert(transactions).values({
        id: newId,
        userId: userId,
        userAccountId: data.userAccountId,
        categoryId: data.categoryId,
        amount: amount.toString(),
        type: data.type,
        date: new Date(data.date),
        notes: data.notes,
      });

      // 4. Update account balance
      await tx
        .update(userAccounts)
        .set({ balance: newBalance.toString() })
        .where(eq(userAccounts.id, account.id));

      return { id: newId, ...data, newBalance };
    });
  },

  async delete(id: string, userId: string) {
    return await db.transaction(async (tx) => {
      const result = await tx
        .select()
        .from(transactions)
        .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
        .limit(1);

      if (result.length === 0) {
        throw new Error("Transaction not found");
      }

      const transaction = result[0];

      // Get account
      const accountResult = await tx
        .select()
        .from(userAccounts)
        .where(eq(userAccounts.id, transaction.userAccountId))
        .limit(1);

      if (accountResult.length > 0) {
        const account = accountResult[0];
        const amount = parseFloat(transaction.amount as unknown as string);
        let newBalance = parseFloat(account.balance as unknown as string);

        // Revert balance
        if (transaction.type === "INCOME") {
          newBalance -= amount;
        } else if (transaction.type === "EXPENSE") {
          newBalance += amount;
        }

        await tx
          .update(userAccounts)
          .set({ balance: newBalance.toString() })
          .where(eq(userAccounts.id, account.id));
      }

      await tx.delete(transactions).where(eq(transactions.id, id));
      
      return { status: "success" };
    });
  },

  async parseWithAI(userId: string, input: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const availableCategories = await db.select({
      id: categories.id,
      name: categories.name,
      type: categories.type,
    }).from(categories);

    const prompt = `
      You are an AI financial assistant. Your job is to extract financial transaction data from natural language input.
      
      Input text: "${input}"
      
      Available Categories:
      ${JSON.stringify(availableCategories, null, 2)}
      
      Analyze the input and return ONLY a valid JSON object matching this schema without any markdown formatting like \`\`\`json:
      {
        "amount": number (extracted amount, ignore words like rb/ribu, interpret them correctly, e.g. 10rb = 10000),
        "type": string ("INCOME" or "EXPENSE"),
        "categoryId": string (the ID of the most appropriate category from the available list),
        "notes": string (short description based on input)
      }
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      })
    });

    if (!response.ok) {
      throw new Error("Failed to communicate with AI service");
    }

    const json = await response.json();
    const textOutput = json.candidates[0].content.parts[0].text;
    
    // Clean up potential markdown formatting
    const cleanedText = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanedText);
  }
};
