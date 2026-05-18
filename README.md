# AI Financial Tracker Web App

A modern, fast, and scalable personal financial tracker application. It allows users to log transactions (income/expenses) across multiple wallets, offers subscription tiers (Free, Pro, Pro Max) with Xendit payment integration, and features an AI-driven system to automatically categorize transactions from natural language inputs.

## Technology Stack

- **Runtime:** [Bun](https://bun.sh/) (Extremely fast JavaScript runtime)
- **Framework:** [ElysiaJS](https://elysiajs.com/) (Ergonomic web framework for Bun)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/) (TypeScript ORM)
- **Database:** MySQL
- **AI Integration:** Google Gemini 1.5 Flash (via Native Fetch)

## Libraries Used

- `elysia` - Core web server.
- `@elysiajs/jwt` - For generating and verifying JSON Web Tokens (Authentication).
- `drizzle-orm` & `drizzle-kit` - For database schema definition, queries, and migrations.
- `mysql2` - Driver for connecting to the MySQL database.
- Bun built-in modules:
  - `bun:test` - Comprehensive unit testing framework.
  - `Bun.password` - Secure password hashing using bcrypt.

## Project Architecture & Structure

The project follows a standard service-oriented architecture, separating routing logic from business rules.

```text
src/
├── db/
│   ├── schema.ts   # Defines database tables and relationships
│   ├── seed.ts     # Script to populate initial master data
│   └── setup.ts    # Database connection pool and Drizzle initialization
├── routes/         # ElysiaJS routing controllers
│   ├── master-route.ts
│   ├── subscription-route.ts
│   ├── transaction-route.ts
│   ├── user-account-route.ts
│   └── user-route.ts
├── services/       # Core business logic and database interactions
│   ├── category-service.ts
│   ├── subscription-service.ts
│   ├── transaction-service.ts
│   ├── user-account-service.ts
│   ├── user-service.ts
│   ├── wallet-service.ts
│   └── xendit-service.ts
└── index.ts        # Entry point and main Elysia app configuration

tests/              # Comprehensive Unit Test Suite
├── setup.ts        # Test utilities (database cleanup, seeding)
└── [module].test.ts # Specific test scenarios per module
```

**Conventions:**
- API Routes are placed in `src/routes/` and named `[entity]-route.ts`.
- Business Logic is placed in `src/services/` and named `[entity]-service.ts`.
- Tests are placed in `tests/` and named `[module].test.ts`.

## Database Schema

The database uses a robust relational schema designed for scalability:

- **`users`**: Core user authentication data and session token.
- **`subscriptions`**: User membership tier (FREE, PRO, PRO_MAX) and validity dates.
- **`wallets`**: Master data for available financial institutions (e.g., Bank, E-Wallet, Cash).
- **`categories`**: Master data for transaction categorization (Income/Expense).
- **`user_accounts`**: Specific accounts/wallets owned by users. Includes a tracked `balance`.
- **`transactions`**: The main ledger logging all financial movements. *Note: Inserting/deleting a transaction uses a DB transaction to safely update the `user_accounts` balance simultaneously.*
- **`payments`**: Logs subscription upgrade attempts, invoices via Xendit, and statuses.

## Available APIs

*All protected endpoints require an `Authorization: Bearer <token>` header.*

**Auth & Users**
- `POST /api/auth/register` - Register a new user (assigns default FREE plan).
- `POST /api/auth/login` - Authenticate and receive a JWT.
- `GET /api/users/me` - Get current user profile.
- `DELETE /api/users/logout` - Invalidate the current session token.

**Master Data**
- `GET /api/wallets` - Get available master wallets.
- `GET /api/categories` - Get transaction categories.

**User Accounts**
- `GET /api/user-accounts` - List accounts owned by the user.
- `POST /api/user-accounts` - Create a new account (Limited to 2 for FREE plan).
- `GET /api/user-accounts/:id` - Get specific account details.
- `PUT /api/user-accounts/:id` - Update account details.
- `DELETE /api/user-accounts/:id` - Delete an account.

**Transactions & AI**
- `GET /api/transactions` - List recent user transactions.
- `POST /api/transactions` - Manually record a transaction (updates balance).
- `POST /api/transactions/ai-parse` - **[AI Feature]** Provide natural language (e.g., "Beli kopi 20rb") to let Gemini automatically parse the amount, type, and category, then record it.
- `GET /api/transactions/:id` - Get transaction details.
- `DELETE /api/transactions/:id` - Delete a transaction and revert the balance.

**Subscriptions & Xendit**
- `GET /api/subscriptions/plans` - View available membership plans.
- `GET /api/subscriptions/me` - Check current subscription status.
- `POST /api/subscriptions/checkout` - Generate a Xendit invoice for upgrading to PRO/PRO_MAX.
- `POST /api/webhooks/xendit` - Webhook receiver for Xendit payment callbacks (Upgrades user automatically upon PAID status).

## Setup Project

1. **Install Dependencies**
   ```bash
   bun install
   ```

2. **Environment Variables**
   Ensure you have a local `.env` file configured.
   ```env
   PORT=3000
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=financial_tracker
   JWT_SECRET=super-secret-key-for-dev
   GEMINI_API_KEY=your_gemini_api_key_here
   XENDIT_SECRET_KEY=your_xendit_key_here
   ```

3. **Database Preparation**
   Make sure you have a MySQL server running and a database named matching `DB_NAME`.

4. **Run Migrations & Seed Data**
   Apply the database schema and populate master tables (wallets, categories):
   ```bash
   bun run db:push
   bun run src/db/seed.ts
   ```

## How to Run Application

Run the development server with hot-reload enabled:
```bash
bun run dev
```
The server will start listening at `http://localhost:3000`.

## How to Test Website

This application includes a comprehensive suite of 20 unit tests covering Auth, User Accounts, Master Data, Transactions (including AI parsing simulation), and Subscription webhooks.

The testing environment is configured to clean up the database between each scenario to ensure strict consistency.

To run the full test suite:
```bash
bun run test
```
