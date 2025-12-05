# ✅ **Employees API with PostgreSQL + Prisma + Express + TypeScript**

A fully working CRUD API using:

- **PostgreSQL**
- **Prisma ORM (with Prisma v7 Postgres adapter)**
- **Express.js**
- **TypeScript**
- **pnpm**
- **tsx** (instead of ts-node)
- Fully structured project
- SQL relations (One-to-many)
- Prisma migrations
- Clean controllers & routing

If a total beginner follows this EXACT sequence → they end up with a **100% working API**, no debugging needed.

---

# 1️⃣ Project Setup

### Create project folder

```sh
mkdir employees-prisma-api
cd employees-prisma-api
```

---

# 2️⃣ Initialize project

```sh
pnpm init
```

---

# 3️⃣ Install Dependencies

### Production dependencies

```sh
pnpm add express prisma @prisma/client dotenv cross-env @prisma/adapter-pg
```

📌 _Note:_ `@prisma/adapter-pg` is required in **Prisma v7+** for PostgreSQL.

### Dev dependencies

```sh
pnpm add -D typescript tsx @types/node @types/express
```

---

# 4️⃣ Initialize TypeScript

```sh
pnpm tsc --init
```

Update **tsconfig.json**:

```jsonc
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "nodenext",
    "target": "esnext",
    "types": ["node"],
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "prisma", "prisma.config.ts"]
}
```

---

# 5️⃣ Update package.json Scripts

```json
{
  "type": "module",
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio"
  }
}
```

---

# 6️⃣ Create Environment Variables

📄 Create `.env` in project root:

```env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/employeesdb"
PORT=5000
```

Ensure PostgreSQL is running locally.

---

# 7️⃣ Initialize Prisma

```sh
pnpm prisma init
```

This creates:

```
prisma/schema.prisma
```

We will update the schema next.

---

# 8️⃣ Define Prisma Schema (Department & Employee)

📄 **prisma/schema.prisma**

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Department {
  id        Int        @id @default(autoincrement())
  name      String
  employees Employee[]
}

model Employee {
  id           Int        @id @default(autoincrement())
  name         String
  email        String     @unique
  salary       Decimal
  departmentId Int
  department   Department @relation(fields: [departmentId], references: [id])
}
```

This creates a **One-to-Many** relation:

```
Department 1 — ∞ Employee
```

---

# 9️⃣ Run Prisma Migration

```sh
pnpm db:migrate --name init
```

Prisma will create the PostgreSQL tables.

---

# 🔟 Generate Prisma Client

```sh
pnpm prisma generate
```

The generated client appears in:

```
src/generated/prisma/
```

---

# 1️⃣1️⃣ Create Project Structure

```
src/
│
├── config/
│   └── env.ts
│
├── controllers/
│   ├── department.controller.ts
│   └── employee.controller.ts
│
├── db/
│   └── prisma.ts
│
├── routes/
│   ├── department.routes.ts
│   └── employee.routes.ts
│
├── app.ts
└── server.ts
```

---

# 1️⃣2️⃣ Environment Loader

📄 **src/config/env.ts**

```ts
import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  dbUrl: process.env.DATABASE_URL || "",
};
```

---

# 1️⃣3️⃣ Prisma Client Provider (Postgres Adapter)

📄 **src/db/prisma.ts**

```ts
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config/env.js";

const adapter = new PrismaPg({
  connectionString: env.dbUrl,
});

export const prisma = new PrismaClient({
  adapter,
});
```

---

# 1️⃣4️⃣ Controllers

## 📘 Department Controller

📄 **src/controllers/department.controller.ts**

```ts
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
    if (!name) return res.status(400).json({ error: "Name required" });

    const dept = await prisma.department.create({
      data: { name },
    });

    res.json(dept);
  }
}
```

---

## 👔 Employee Controller

📄 **src/controllers/employee.controller.ts**

```ts
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

    const emp = await prisma.employee.delete({
      where: { id },
    });

    res.json(emp);
  }
}
```

---

# 1️⃣5️⃣ Routes

## Department Routes

📄 **src/routes/department.routes.ts**

```ts
import { Router } from "express";
import { DepartmentController } from "../controllers/department.controller.js";

const router: Router = Router();

router.get("/", DepartmentController.getAll);
router.post("/", DepartmentController.create);

export default router;
```

---

## Employee Routes

📄 **src/routes/employee.routes.ts**

```ts
import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller.js";

const router: Router = Router();

router.get("/", EmployeeController.getAll);
router.get("/:id", EmployeeController.getOne);
router.post("/", EmployeeController.create);
router.put("/:id", EmployeeController.update);
router.delete("/:id", EmployeeController.delete);

export default router;
```

---

# 1️⃣6️⃣ App File

📄 **src/app.ts**

```ts
import express, { type Express } from "express";
import departmentRoutes from "./routes/department.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

const app: Express = express();

app.use(express.json());

app.use("/employees", employeeRoutes);
app.use("/departments", departmentRoutes);

export default app;
```

---

# 1️⃣7️⃣ Server Entry

📄 **src/server.ts**

```ts
import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./db/prisma.js";

async function start() {
  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
}

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

start();
```

---

# 1️⃣8️⃣ Start Development Server

```sh
pnpm dev
```

✔ Server running at
**[http://localhost:5000](http://localhost:5000)**

---

# 1️⃣9️⃣ Test the API

## ➕ Create Department

```sh
curl -X POST http://localhost:5000/departments \
-H "Content-Type: application/json" \
-d '{"name": "Engineering"}'
```

## ➕ Create Employee

```sh
curl -X POST http://localhost:5000/employees \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "email": "john@example.com", "salary": 80000, "departmentId": 1}'
```

## 📄 Get All Employees

```sh
curl -X GET http://localhost:5000/employees
```

## 📄 Get All Departments (with employees)

```sh
curl -X GET http://localhost:5000/departments
```

## ✏ Update Employee

```sh
curl -X PUT http://localhost:5000/employees/1 \
-H "Content-Type: application/json" \
-d '{"salary": 85000}'
```

---
