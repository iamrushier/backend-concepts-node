// src/config/index.ts
import { loadEnv } from "./loadEnv.js";

loadEnv();

export const config = {
  appName: process.env.APP_NAME || "App",
  port: Number(process.env.PORT) || 3000,
  dbUrl: process.env.DB_URL || "",
  debug: process.env.DEBUG_MODE === "true",
};
