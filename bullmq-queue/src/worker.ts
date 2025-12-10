// src/worker.ts
import { Worker } from "bullmq";
import { redisConfig, queueName } from "./queues/config.js";

const worker = new Worker(
  queueName,
  async (job) => {
    console.log(`Processing job: ${job.id}`);
    const { to, subject, message } = job.data;

    // Fake email
    console.log(`
        Sending Email:
        To: ${to}
        Subject: ${subject}
        Message: ${message}
        `);
    // Simulate delay
    await new Promise((res) => setTimeout(res, 1500));

    return { status: "sent" };
  },
  {
    connection: redisConfig,
  }
);

// Worker events listeners
worker.on("completed", (job) => {
  console.log(`Worker completed job: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`Worker failed job: ${job?.id}: ${err.message}`);
});
