// src/app.ts
import express, { type Express } from "express";
import healthRoutes from "./routes/health.routes.js";

const app: Express = express();
app.use(express.json());
app.use(healthRoutes);
export default app;
