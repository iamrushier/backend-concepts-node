// src/routes/department.routes.ts
import { Router } from "express";
import { DepartmentController } from "../controllers/department.controller.js";

const router: Router = Router();
router.get("/", DepartmentController.getAll);
router.post("/", DepartmentController.create);

export default router;
