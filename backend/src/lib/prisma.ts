// import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { Pool } from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// const connectionString = process.env.DATABASE_URL;

// if (!connectionString) {
//   throw new Error("DATABASE_URL is missing in .env");
// }

// const pool = new Pool({
//   connectionString,
//   max: 10,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 10000,
// });

// const adapter = new PrismaPg(pool);

// const prisma = new PrismaClient({
//   adapter,
//   log: ["error", "warn"],
// });

// export default prisma;










// import { PrismaClient } from "@prisma/client";
// import dotenv from "dotenv";

// dotenv.config();

// const prisma = new PrismaClient({
//   log: ["error", "warn"],
// });

// export default prisma;