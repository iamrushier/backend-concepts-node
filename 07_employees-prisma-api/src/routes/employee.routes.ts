// src/routes/employee.routes.ts
import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller.js";

const router: Router = Router();
router.get("/", EmployeeController.getAll);
router.get("/:id", EmployeeController.getOne);
router.post("/", EmployeeController.create);
router.put("/:id", EmployeeController.update);
router.delete("/:id", EmployeeController.delete);

export default router;
