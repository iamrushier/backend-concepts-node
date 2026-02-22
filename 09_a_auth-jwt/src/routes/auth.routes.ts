// src/routes/auth.routes.ts
import { Router } from "express";
import { UserService } from "../services/user.service.js";
import { JwtService } from "../services/jwt.service.js";

const router: Router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });
    const user = await UserService.register(email, password, role || "user");
    res.status(201).json({
      message: "Registered",
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.validateLogin(email, password);
    const accessToken = JwtService.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = JwtService.generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    res.json({ accessToken, refreshToken });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ error: "Refresh token required" });
  try {
    const decoded = JwtService.verifyRefresh(refreshToken);
    if (typeof decoded === "string" || !decoded.id || !decoded.role) {
      return res.status(401).json({ error: "Invalid token payload" });
    }
    const newAccess = JwtService.generateAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
    res.json({ accessToken: newAccess });
  } catch (err: any) {
    res.status(401).json({ error: "Invalid or expired refresh token" });
  }
});

export default router;
