// src/middleware/auth/middleware.ts
import type { Request, Response, NextFunction } from "express";
import { JwtService } from "../services/jwt.service.js";
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer"))
    return res.status(401).json({ error: "Unauthorized" });
  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = JwtService.verifyAccess(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
