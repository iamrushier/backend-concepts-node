// src/routes/taskRoutes.ts
import { Router } from "express";
import type { Task } from "../types/task.js";

const router: Router = Router();

let tasks: Task[] = [];
let idCounter = 1;

router.get("/", (req, res) => {
  res.json(tasks);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string")
    return res.status(400).json({ error: "Invalid title" });
  const newTask: Task = {
    id: idCounter++,
    title,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  if (typeof title === "string") task.title = title;
  if (typeof completed === "boolean") task.completed = completed;

  res.json(task);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  const deleted = tasks.splice(index, 1)[0];
  res.json(deleted);
});

export default router;
