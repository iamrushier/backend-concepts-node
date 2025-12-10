// src/worker.ts
import { Worker } from "bullmq";
import { redisConfig, queueName } from "./queues/config.js";
import { sendEmail } from "./utils/sendEmail.js";

const worker = new Worker(
  queueName,
  async (job) => {
    console.log(`Processing job: ${job.id}`);
    const { to, subject, message } = job.data;

    await sendEmail(to, subject, message);

    return { status: "sent" };
  },
  {
    connection: redisConfig,
  }
);

// Worker events listeners
worker.on("completed", (job) => {
  console.log(`[Worker] Email delivered for job: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`[Worker] Email failed for job: ${job?.id}: ${err.message}`);
});
