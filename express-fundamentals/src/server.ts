// src/server.ts
import express from "express";
import taskRouter from "./routes/taskRoutes.js";

const app = express();
const PORT = 3010;

app.use(express.json());

app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.json({ message: "Task List API (Express Fundamentals)" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
