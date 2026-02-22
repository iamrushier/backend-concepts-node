import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router: Router = Router();

router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

router.get("/admin", authMiddleware, requireRole("admin"), (req, res) => {
  res.json({ message: "Welcome admin!" });
});

export default router;
