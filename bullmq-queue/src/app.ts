// src/app.ts
import express from "express";
import { type Express } from "express";
import emailRoutes from "./routes/emailRoutes.js";

const app: Express = express();

app.use(express.json());
app.use("/email", emailRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Email Queue API running" });
});

export default app;
