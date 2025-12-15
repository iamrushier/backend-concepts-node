// src/server.ts
import express from "express";
import rateLimit from "express-rate-limit";

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20, // Max 20 requests per minute
  message: "Too many requests",
});
app.use(limiter);
app.use(express.json());

let tasks = [
  { id: 1, title: "Learn load testing" },
  { id: 2, title: "Build an API" },
];

app.get("/tasks", (_, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
