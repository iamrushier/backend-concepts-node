import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 6000,
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  weatherTtl: Number(process.env.WEATHER_TTL) || 30, // in minutes
  weatherApiKey: process.env.WEATHER_API_KEY || "",
};
