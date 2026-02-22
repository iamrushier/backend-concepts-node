// src/db/prisma.ts
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config/env.js";

const adapter = new PrismaPg({
  connectionString: env.dbUrl,
});

export const prisma = new PrismaClient({
  adapter,
});
