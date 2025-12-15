// src/routes/health.routes.ts
import { Router } from "express";
import { checkReadiness } from "../services/readiness.service.js";

const router: Router = Router();

// Checks if process is running
router.get("/healthz", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// Checks if app is ready to receive traffic
router.get("/readiness", async (_req, res) => {
  try {
    await checkReadiness();

    res.status(200).json({
      status: "ready",
    });
  } catch (error) {
    res.status(503).json({
      status: "not ready",
      reason: (error as Error).message,
    });
  }
});

export default router;
