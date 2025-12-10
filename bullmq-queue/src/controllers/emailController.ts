// src/controllers/emailController.ts
import type { Request, Response } from "express";
import { emailQueue } from "../queues/emailQueue.js";

export const emailController = {
  async send(req: Request, res: Response) {
    const { to, subject, message } = req.body;
    if (!to || !subject || !message)
      return res.status(400).json({ error: "Missing fields" });

    // Add job to queue
    const job = await emailQueue.add(
      "sendEmail",
      { to, subject, message },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
      }
    );

    res.json({
      message: "Email job queued",
      jobId: job.id,
    });
  },
};
