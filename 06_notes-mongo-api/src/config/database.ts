// notes-mongo-api/src/config/database.ts
import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
  try {
    mongoose.connect(env.mongoURI);
    console.log("[DB] Connected to MongoDB");
  } catch (error) {
    console.error("[DB] Connection Failed:", error);
    process.exit(1);
  }
}
