// src/server.ts
import express, { type Express } from "express";
import noteRoutes from "./routes/note.route.js";
import { connectDB } from "./config/database.js";
import { env } from "./config/env.js";

async function start() {
  await connectDB();
  const app: Express = express();

  app.use(express.json());
  app.use("/notes", noteRoutes);

  app.listen(env.port, () => console.log(`Listening on ${env.port}`));
}
start();
