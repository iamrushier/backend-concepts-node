// src/routes/webhook.routes.ts
import { Router } from "express";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET!;
// Store which events are already processed
const processedEvents = new Set<string>();

const router: Router = Router();

// Webhook endpoint
router.post("/", (req, res) => {
  try {
    const signature = req.headers["x-webhook-signature"] as string;
    if (!signature) return res.status(400).send("No signature provided");
    const expectedSignature = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(req.body)
      .digest("hex");
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );

    if (!isValid)
      return res.status(401).send("Invalid signature - fake webhook");

    const event = JSON.parse(req.body.toString()); // Parse JSON as it's safe
    if (processedEvents.has(event.id))
      return res.status(200).send("Already processed this event");

    // Business logic
    console.log(`Valid webhook received;`, event);
    if (event.type === "payment.succeeded")
      console.log(`Payment of ${event.data.amount} received`);
    processedEvents.add(event.id);
    res.status(200).send("Webhook received");
  } catch (err: any) {
    console.error("Error processing webhook", err);
    res.status(500).send("internal server error");
  }
});
export default router;
