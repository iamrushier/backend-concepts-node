import { sendEmail } from "./sendEmail.js";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  await sendEmail(
    process.env.RECEIVER_MAIL!,
    "Test Email",
    "Hello! This is real email sent from nodemailer"
  );
}

main();
