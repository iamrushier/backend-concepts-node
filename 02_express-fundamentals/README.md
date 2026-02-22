# 🚀 Tutorial: Express Fundamentals – Build a Task List CRUD API (No Database)

In this tutorial, you will build a complete REST API using **Express** with a simple **in-memory task list**.

This demonstrates:

- Express app structure
- Routers
- Middleware (JSON parsing)
- CRUD operations
- Request handling

---

# 1️⃣ Create the Project Folder

```bash
mkdir express-fundamentals
cd express-fundamentals
```

---

# 2️⃣ Initialize Project Using pnpm

```bash
pnpm init
```

This generates `package.json`.

---

# 3️⃣ Install Dependencies

### Install Express (runtime)

```bash
pnpm add express
```

### Install Dev Dependencies

```bash
pnpm add -D typescript tsx @types/node @types/express
```

---

# 4️⃣ Initialize TypeScript Configuration

```bash
pnpm tsc --init
```

This creates `tsconfig.json`.

---

# 5️⃣ Configure `package.json`

Open `package.json` and update:

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx src/server.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

### Notes

- `"type": "module"` → ensures ES module syntax (`import/export`)
- `dev` uses tsx to run TypeScript directly
- `build` compiles to JavaScript
- `start` runs compiled output

---

# 6️⃣ Configure TypeScript in `tsconfig.json`

Find `"compilerOptions"` and set:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",

    "module": "nodenext",
    "target": "esnext",
    "moduleResolution": "nodenext",

    "types": ["node", "express"],

    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

# 7️⃣ Create Folder Structure

```bash
mkdir -p src/routes src/types
```

---

# 8️⃣ Define Task Type

Create file:

```
src/types/task.ts
```

Add:

```ts
// src/types/task.ts

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}
```

---

# 9️⃣ Create Task Routes

Create file:

```
src/routes/taskRoutes.ts
```

Add the complete CRUD router:

```ts
// src/routes/taskRoutes.ts

import { Router } from "express";
import type { Task } from "../types/task.js";

const router: Router = Router();

// In-memory data store
let tasks: Task[] = [];
let idCounter = 1;

// GET /tasks → Get all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id → Get single task
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  res.json(task);
});

// POST /tasks → Create new task
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Invalid title" });
  }

  const newTask: Task = {
    id: idCounter++,
    title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id → Update task
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (typeof title === "string") task.title = title;
  if (typeof completed === "boolean") task.completed = completed;

  res.json(task);
});

// DELETE /tasks/:id → Delete task
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return res.status(404).json({ error: "Task not found" });

  const deleted = tasks.splice(index, 1)[0];
  res.json(deleted);
});

export default router;
```

---

# 🔟 Create the Main Server File

Create:

```
src/server.ts
```

Add:

```ts
// src/server.ts

import express from "express";
import taskRouter from "./routes/taskRoutes.js";

const app = express();
const PORT = 3010;

// Middleware to parse JSON bodies
app.use(express.json());

// Task routes
app.use("/tasks", taskRouter);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Task List API (Express Fundamentals)" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

# 1️⃣1️⃣ Start in Development Mode

```bash
pnpm run dev
```

Output:

```
Server running at http://localhost:3010
```

---

# 1️⃣2️⃣ Test All Endpoints

Using curl or Postman:

---

## ✔️ Create Task — POST /tasks

```bash
curl -X POST http://localhost:3010/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Express"}'
```

---

## ✔️ Get All Tasks — GET /tasks

```bash
curl http://localhost:3010/tasks
```

---

## ✔️ Get Task by ID — GET /tasks/1

```bash
curl http://localhost:3010/tasks/1
```

---

## ✔️ Update Task — PUT /tasks/1

```bash
curl -X PUT http://localhost:3010/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

---

## ✔️ Delete Task — DELETE /tasks/1

```bash
curl -X DELETE http://localhost:3010/tasks/1
```

---

# 1️⃣3️⃣ Build for Production

```bash
pnpm run build
```

---

# 1️⃣4️⃣ Run Built Version

```bash
pnpm start
```

The server runs exactly the same but from the `dist/` folder.

---
