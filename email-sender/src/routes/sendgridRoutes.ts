// src/routes/sendgridRoutes.ts
import { Router } from "express";
import {
  sendWithSendgrid,
  sendHTMlWithSendgrid,
} from "../utils/sendgridMailer.js";

const router: Router = Router();

router.post("/text", async (req, res) => {
  const { to, subject, message } = req.body;
  await sendWithSendgrid({ to, subject, text: message });
  return res.json({ status: "sent", provider: "sendgrid", type: "text" });
});

router.post("/html", async (req, res) => {
  const { to, subject, name } = req.body;
  await sendHTMlWithSendgrid({
    to,
    subject,
    templateName: "welcome",
    data: { name },
  });
  return res.json({ status: "sent", provider: "sendgrid", types: "html" });
});

export default router;
