// src/controllers/employee.controller.ts
import { prisma } from "../db/prisma.js";
import type { Request, Response } from "express";

export class EmployeeController {
  static async getAll(req: Request, res: Response) {
    const employees = await prisma.employee.findMany({
      include: { department: true },
    });
    res.json(employees);
  }

  static async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: { department: true },
    });
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  }

  static async create(req: Request, res: Response) {
    const { name, email, salary, departmentId } = req.body;
    if (!name || !email || !salary || !departmentId)
      return res.status(400).json({ error: "Missing required fields" });
    const emp = await prisma.employee.create({
      data: { name, email, salary, departmentId },
    });
    res.status(201).json(emp);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name, email, salary, departmentId } = req.body;
    const emp = await prisma.employee.update({
      where: { id },
      data: { name, email, salary, departmentId },
    });
    res.json(emp);
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const emp = await prisma.employee.delete({ where: { id } });
    res.json(emp);
  }
}
