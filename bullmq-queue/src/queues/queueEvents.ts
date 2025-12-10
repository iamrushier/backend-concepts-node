// src/queues/queueEvents.ts
import { QueueEvents } from "bullmq";
import { redisConfig, queueName } from "./config.js";

const emailEvents = new QueueEvents(queueName, {
  connection: redisConfig,
});

// Listen to events - job completion or failure
emailEvents.on("completed", ({ jobId }) => {
  console.log(`Job ${jobId} completed`);
});
emailEvents.on("failed", ({ jobId, failedReason }) => {
  console.error(`Job ${jobId} failed: ${failedReason}`);
});

export default emailEvents;
