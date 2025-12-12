// arc/app.ts
import express, { type Express } from "express";
import {
  processImage,
  login,
  generateReport,
  healthCheck,
} from "./controllers/process.controller.js";

const app: Express = express();

app.use(express.json());

app.get("/health", healthCheck);
app.post("/process-image", processImage);
app.post("/auth/login", login);
app.get("/analytics/report", generateReport);

export default app;
