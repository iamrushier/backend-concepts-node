// src/queues/config.ts
import { type ConnectionOptions } from "bullmq";
import dotenv from "dotenv";
dotenv.config();

export const redisConfig: ConnectionOptions = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379),
};

export const queueName = process.env.QUEUE_NAME!;
