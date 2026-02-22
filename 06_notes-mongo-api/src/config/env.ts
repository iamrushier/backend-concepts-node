// notes-mongo-api/src/config/env.ts
import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongoURI: process.env.MONGO_URI || "",
};
