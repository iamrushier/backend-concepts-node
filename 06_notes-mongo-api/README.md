# **MongoDB CRUD API with Express + TypeScript + Mongoose**

### **Project: Notes API**

This tutorial will guide you step-by-step to build a complete MongoDB CRUD Notes API using:

- TypeScript
- Express
- Mongoose
- pnpm
- tsx
- .env config
- Clean folder structure
- Fully working REST endpoints

Perfect for beginners and professionals.

---

# 1️⃣ **Project Setup**

### **Create project folder**

```sh
mkdir notes-mongo-api
cd notes-mongo-api
```

---

# 2️⃣ Initialize project

```sh
pnpm init
```

---

# 3️⃣ Install dependencies

### **Production dependencies:**

```sh
pnpm add express mongoose dotenv cross-env
```

### **Dev dependencies:**

```sh
pnpm add -D typescript tsx @types/node @types/express
```

---

# 4️⃣ Initialize TypeScript config

```sh
pnpm tsc --init
```

Now update **tsconfig.json** (ONLY the required fields):

### 📌 tsconfig.json (edits only)

```jsonc
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "nodenext",
    "target": "esnext",
    "types": ["node"]
  }
}
```

---

# 5️⃣ Update package.json Scripts

Open **package.json** and add:

```json
{
  "type": "module",
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

---

# 6️⃣ Create Environment File

Create **.env** in root:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/notesdb
```

**Note:** Make sure MongoDB service is running on your machine.

---

# 7️⃣ Start building the project structure

```
notes-mongo-api/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── types/
│   └── server.ts
└── .env
```

---

# 8️⃣ Create Environment Loader

📄 **src/config/env.ts**

```ts
import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongoURI: process.env.MONGO_URI || "",
};
```

✔ Loads environment variables
✔ Prevents undefined values

---

# 9️⃣ MongoDB Connection Setup

📄 **src/config/database.ts**

```ts
import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
  try {
    await mongoose.connect(env.mongoURI);
    console.log("[DB] Connected to MongoDB");
  } catch (error) {
    console.error("[DB] Connection Failed:", error);
    process.exit(1);
  }
}
```

---

# 🔟 Create Note Type

📄 **src/types/note.ts**

```ts
export interface Note {
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

---

# 1️⃣1️⃣ Build Mongoose Model

📄 **src/models/note.model.ts**

```ts
import mongoose from "mongoose";
import type { Note } from "../types/note.js";

const NoteSchema = new mongoose.Schema<Note>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const NoteModel = mongoose.model("Note", NoteSchema);
```

✔ `timestamps` auto-manages createdAt & updatedAt
✔ Typescript-safe Schema & Model

---

# 1️⃣2️⃣ Create Note Controller

📄 **src/controllers/note.controller.ts**

```ts
import type { Request, Response } from "express";
import { NoteModel } from "../models/note.model.js";

export class NoteController {
  static async getAll(req: Request, res: Response) {
    const notes = await NoteModel.find();
    res.json(notes);
  }

  static async getOne(req: Request, res: Response) {
    const note = await NoteModel.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  }

  static async create(req: Request, res: Response) {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content required" });
    }

    const created = await NoteModel.create({ title, content });
    res.json(created);
  }

  static async update(req: Request, res: Response) {
    const { title, content } = req.body;

    const updated = await NoteModel.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Note not found" });
    res.json(updated);
  }

  static async delete(req: Request, res: Response) {
    const deleted = await NoteModel.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Note not found" });
    res.json(deleted);
  }
}
```

---

# 1️⃣3️⃣ Define Routes

📄 **src/routes/note.route.ts**

```ts
import { Router } from "express";
import { NoteController } from "../controllers/note.controller.js";

const router: Router = Router();

router.get("/", NoteController.getAll);
router.post("/", NoteController.create);
router.get("/:id", NoteController.getOne);
router.put("/:id", NoteController.update);
router.delete("/:id", NoteController.delete);

export default router;
```

---

# 1️⃣4️⃣ Create Server Entry File

📄 **src/server.ts**

```ts
import express, { type Express } from "express";
import noteRoutes from "./routes/note.route.js";
import { connectDB } from "./config/database.js";
import { env } from "./config/env.js";

async function start() {
  await connectDB();

  const app: Express = express();
  app.use(express.json());

  app.use("/notes", noteRoutes);

  app.listen(env.port, () =>
    console.log(`Server running at http://localhost:${env.port}`)
  );
}

start();
```

---

# 1️⃣5️⃣ Run the Development Server

```sh
pnpm dev
```

✔ Server starts at:
**[http://localhost:4000](http://localhost:4000)**

---

# 1️⃣6️⃣ Test the API

### ➕ Create Note

```sh
curl -X POST http://localhost:4000/notes \
-H "Content-Type: application/json" \
-d '{"title": "My first note", "content": "Learning MongoDB with Mongoose!"}'
```

### 📄 Get All Notes

```sh
curl -X GET http://localhost:4000/notes
```

### 🔍 Get One Note

```sh
curl -X GET http://localhost:4000/notes/NOTE_ID_HERE
```

### ✏ Update Note

```sh
curl -X PUT http://localhost:4000/notes/NOTE_ID_HERE \
-H "Content-Type: application/json" \
-d '{"title": "Updated Title", "content": "The content has been revised."}'
```

### ❌ Delete Note

```sh
curl -X DELETE http://localhost:4000/notes/NOTE_ID_HERE
```

---
