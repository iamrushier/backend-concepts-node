import { createClient } from "redis";
import { env } from "./env.js";

export const redisClient: ReturnType<typeof createClient> = createClient({
  url: env.redisUrl,
});

redisClient.on("error", (err) => {
  console.error("[Redis] Error", err);
});

export async function connectRedis() {
  await redisClient.connect();
  console.log("[Redis] Connected to Redis server");
}
