import { mysqlTable, varchar, timestamp, text, mysqlEnum, decimal } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  profilePicture: text("profile_picture"),
  token: text("token"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const subscriptions = mysqlTable("subscriptions", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
  planType: mysqlEnum("plan_type", ['FREE', 'PRO', 'PRO_MAX']).notNull().default('FREE'),
  status: mysqlEnum("status", ['ACTIVE', 'INACTIVE', 'PENDING', 'CANCELLED']).notNull().default('PENDING'),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
});

export const wallets = mysqlTable("wallets", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // BANK, E_WALLET, CASH
});

export const userAccounts = mysqlTable("user_accounts", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
  walletId: varchar("wallet_id", { length: 36 }).notNull().references(() => wallets.id),
  accountNumber: varchar("account_number", { length: 50 }),
  balance: decimal("balance", { precision: 15, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const categories = mysqlTable("categories", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ['INCOME', 'EXPENSE']).notNull(),
});

export const transactions = mysqlTable("transactions", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
  userAccountId: varchar("user_account_id", { length: 36 }).notNull().references(() => userAccounts.id),
  categoryId: varchar("category_id", { length: 36 }).references(() => categories.id),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  type: mysqlEnum("type", ['INCOME', 'EXPENSE', 'TRANSFER']).notNull(),
  date: timestamp("date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const payments = mysqlTable("payments", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
  subscriptionId: varchar("subscription_id", { length: 36 }).notNull().references(() => subscriptions.id),
  xenditInvoiceId: varchar("xendit_invoice_id", { length: 255 }).unique(),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  status: mysqlEnum("status", ['PENDING', 'PAID', 'EXPIRED', 'FAILED']).notNull().default('PENDING'),
  paymentMethod: varchar("payment_method", { length: 255 }),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
