// src/utils/emailSender.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendTextEmail(to: string, subject: string, text: string) {
  const info = await transporter.sendMail({
    from: `"Email Demo <${process.env.SMTP_USER}>"`,
    to,
    subject,
    text,
  });
  console.log(`Email send! Message ID:`, info.messageId);
}

export async function sendHTMLEmail(
  to: string,
  subject: string,
  templateName: string,
  data: any
) {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    `${templateName}.ejs`
  );

  const html = await ejs.renderFile(templatePath, {
    ...data,
    email: to,
    provider: "nodemailer",
  });

  await transporter.sendMail({
    from: `"Email Demo" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}
