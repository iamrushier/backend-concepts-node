// src/test-webhook.ts
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const WEBHOOK_SECRET = "whsec_123456";

// Fake event
const event = {
  id: "evt_12345",
  type: "payment.succeeded",
  data: {
    amount: 100,
    customer: "john@example.com",
  },
};
const payload = JSON.stringify(event);

const signature = crypto
  .createHmac("sha256", WEBHOOK_SECRET)
  .update(payload)
  .digest("hex");

// Send the webhook
fetch("http://localhost:3000/webhook", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-webhook-signature": signature,
  },
  body: payload,
})
  .then((res) => res.text())
  .then((body) => console.log("Response:", body))
  .catch((err) => console.error("Error:", err));
