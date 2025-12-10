// src/routes/emailRoutes.ts
import { Router } from "express";
import { sendTextEmail, sendHTMLEmail } from "../utils/emailSender.js";

const router: Router = Router();

router.post("/text", async (req, res) => {
  const { to, subject, message } = req.body;
  await sendTextEmail(to, subject, message);
  res.json({ status: "sent", type: "text" });
});

router.post("/html", async (req, res) => {
  const { to, subject, name } = req.body;
  await sendHTMLEmail(to, subject, "welcome", { name });
  res.json({ status: "sent", type: "html" });
});

export default router;
