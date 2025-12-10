// src/routes/emailRoutes.ts
import { Router } from "express";
import { emailController } from "../controllers/emailController.js";

const router: Router = Router();

router.post("/send", emailController.send);

export default router;
