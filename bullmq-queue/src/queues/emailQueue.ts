// src/queues/emailQueue.ts
import { Queue } from "bullmq";
import { redisConfig, queueName } from "./config.js";

export const emailQueue = new Queue(queueName, {
  connection: redisConfig,
});
