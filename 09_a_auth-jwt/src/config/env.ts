// src/config/env.ts
import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  accessSecret: process.env.JWT_ACCESS_SECRET!,
  refreshSecret: process.env.JWT_REFRESH_SECRET!,
  accessExpires: process.env.ACCESS_EXPIRES_IN || "15m",
  refreshExpires: process.env.REFRESH_EXPIRES_IN || "7d",
};
