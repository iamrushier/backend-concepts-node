// src.server.ts
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { env } from "./config/env.js";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(env.port, () => {
  console.log(`Auth server running at ${env.port}`);
});
