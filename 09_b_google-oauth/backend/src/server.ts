// src/server.ts
import express from "express";
import { type Express } from "express";
import googleAuthRoutes from "./routes/auth.google.routes.js";
import { env } from "./config/env.js";

const app: Express = express();

app.use("/auth", googleAuthRoutes);
app.listen(env.port, () => {
  console.log(`Listening on http://localhost:${env.port}`);
});
export default app;
