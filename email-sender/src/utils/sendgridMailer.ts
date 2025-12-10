// src/utils/sendgridMailer.ts
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendWithSendgrid = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM!,
    subject,
    text,
  };
  await sgMail.send(msg);
};

export const sendHTMlWithSendgrid = async ({
  to,
  subject,
  templateName,
  data,
}: {
  to: string;
  subject: string;
  templateName: string;
  data: any;
}) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    `${templateName}.ejs`
  );

  const html = (await ejs.renderFile(templatePath, {
    ...data,
    email: to,
    provider: "sendgrid",
  })) as string;

  const msg = {
    to,
    from: process.env.SENDGRID_FROM!,
    subject,
    html,
  };
  await sgMail.send(msg);

  return { status: "sent", provider: "sendgrid", types: "html" };
};
