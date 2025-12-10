// src/utils/sendMail.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendEmail(to: string, subject: string, text: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: process.env.SMTP_PORT!,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  await transporter.sendMail({
    from: `Queue Demo <${process.env.SMTP_USER!}>`,
    to,
    subject,
    text,
  });

  console.log(`Email sent to ${to}`);
}
