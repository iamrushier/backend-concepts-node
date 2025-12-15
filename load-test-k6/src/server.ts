// src/server.ts
import express from "express";
const app = express();

app.use(express.json());

let tasks = [
  { id: 1, title: "Learn load testing" },
  { id: 2, title: "Build an API" },
];

app.get("/tasks", (req, res) => {
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
