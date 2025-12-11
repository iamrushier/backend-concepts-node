// src/controllers/user.controller.ts
import type { Request, Response } from "express";
import userService from "../services/user.service.js";

export const findAll = (req: Request, res: Response) => {
  const users = userService.getAll();
  res.json(users);
};

export const addUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) return res.json({ error: "Name and email required" });
  const user = userService.create(name, email);
  res.status(201).json(user);
};
