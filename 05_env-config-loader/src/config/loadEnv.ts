// src/config/loadEnv.ts
import path from "node:path";
import dotenv from "dotenv";

export function loadEnv() {
  const env = process.env.NODE_ENV || "development";
  // Always load base .env first
  dotenv.config({ path: path.resolve(".env") });

  // Load env-specific file
  const envFile = `.env.${env}`;
  dotenv.config({ path: path.resolve(envFile) });

  console.log(`[ENV Loaded environment ${env}`);
}
