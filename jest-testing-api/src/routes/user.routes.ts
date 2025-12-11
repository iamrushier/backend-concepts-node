// src/routes/user.routes.ts
import { findAll, addUser } from "../controllers/user.controller.js";
import { Router } from "express";

const router: Router = Router();
router.get("/", findAll);
router.post("/", addUser);

export default router;
