// src/controllers/department.controller.ts
import { prisma } from "../db/prisma.js";
import type { Request, Response } from "express";

export class DepartmentController {
  static async getAll(req: Request, res: Response) {
    const departments = await prisma.department.findMany({
      include: { employees: true },
    });
    res.json(departments);
  }

  static async create(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) res.status(400).json({ error: "Name required" });
    const dept = await prisma.department.create({ data: { name } });
    res.json(dept);
  }
}
