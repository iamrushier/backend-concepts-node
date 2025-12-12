import type { Request, Response } from "express";
import {
  heavyComputation,
  processData,
  simulateHashing,
} from "../utils/cpuIntensive.js";

export const processImage = (_: Request, res: Response) => {
  const startTime = Date.now();
  const result = heavyComputation(2000000);
  const processed = processData(5000);
  const duration = Date.now() - startTime;
  res.json({
    message: "Image processed",
    pid: process.pid,
    duration: `${duration}ms`,
    dataPoints: processed.length,
    result: result.toFixed(2),
  });
};

export const login = (_: Request, res: Response) => {
  const startTime = Date.now();
  const hash = simulateHashing(150000);
  const duration = Date.now() - startTime;
  res.json({
    message: "Authentication successful",
    pid: process.pid,
    duration: `${duration}ms`,
    token: hash.substring(0, 32),
  });
};

export const generateReport = (_: Request, res: Response) => {
  const startTime = Date.now();
  const results = [];
  // Simulate complex calculations
  for (let i = 0; i < 5; i++) {
    results.push(heavyComputation(1000000));
  }
  const duration = Date.now() - startTime;
  res.json({
    message: "Analytics report generated",
    pid: process.pid,
    duration: `${duration}ms`,
    data: results,
  });
};

export const healthCheck = (_: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "This is a light endpoint",
    pid: process.pid,
    uptime: process.uptime,
    timestamp: Date.now(),
  });
};
