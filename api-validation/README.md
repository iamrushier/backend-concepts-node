# 🚀 Tutorial: Build an API with Input Validation Using Express + Zod

In this tutorial, you will build a small Express API with:

- A `/auth/register` POST endpoint
- Schema validation using **Zod**
- Secure input sanitization
- A clean validation middleware
- Proper error response format

This project focuses on learning:

- **Request validation with Zod**
- **Error handling best practices**
- **Input sanitization & safe parsing techniques**

---

# 1️⃣ Create Project Directory

```bash
mkdir api-validation
cd api-validation
```

---

# 2️⃣ Initialize Project

```bash
pnpm init
```

---

# 3️⃣ Install Dependencies

### Runtime packages:

```bash
pnpm add express zod
```

### Dev packages:

```bash
pnpm add -D typescript tsx @types/node @types/express
```

---

# 4️⃣ Initialize TypeScript

```bash
pnpm tsc --init
```

---

# 5️⃣ Configure `package.json`

Add `"type": "module"` and the scripts block:

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

---

# 6️⃣ Configure `tsconfig.json`

Open the generated file and update relevant fields:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",

    "module": "nodenext",
    "target": "esnext",
    "moduleResolution": "nodenext",

    "types": ["node", "express"],

    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

---

# 7️⃣ Create Folder Structure

```bash
mkdir -p src/schemas src/middleware src/routes
```

---

# 8️⃣ Create User Schema (Zod)

**File:** `src/schemas/userSchema.ts`

```ts
import { z } from "zod";

/**
 * User Registration Validation Schema
 * All incoming fields are validated & sanitized before reaching the handler.
 */
export const userRegistrationSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 chars long")
    .max(20, "Username must not exceed 20 chars")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username may contain only letters, numbers, and underscores"
    ),

  email: z.email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(25, "Password too long"),
});
```

### Notes

- `safeParse` prevents server crashes
- Zod automatically sanitizes & strips unknown fields

---

# 9️⃣ Create Validation Middleware

**File:** `src/middleware/validate.ts`

```ts
import type { Request, Response, NextFunction } from "express";
import type { ZodType as ZodSchema } from "zod";

/**
 * Generic reusable validation middleware.
 * Pass any Zod schema to validate req.body safely.
 */
export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Format errors in a readable structure
      const errors = result.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      return res.status(400).json({
        error: "Invalid request data",
        details: errors,
      });
    }

    // Replace body with parsed (sanitized) data
    req.body = result.data;

    next();
  };
}
```

### Notes

- Ensures **type-safe** sanitized inputs
- Prevents users from sending unwanted properties
- Avoids throwing exceptions — returns clean errors

---

# 🔟 Create Auth Routes

**File:** `src/routes/authRoutes.ts`

```ts
import { Router } from "express";
import { validateBody } from "../middleware/validate.js";
import { userRegistrationSchema } from "../schemas/userSchema.js";

const router: Router = Router();

/**
 * POST /auth/register
 * Validates user registration payload and responds with cleaned data.
 */
router.post("/register", validateBody(userRegistrationSchema), (req, res) => {
  const { username, email } = req.body;

  return res.status(201).json({
    message: "User registration successful",
    user: { username, email },
  });
});

export default router;
```

---

# 1️⃣1️⃣ Create the Server File

**File:** `src/server.ts`

```ts
import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 3030;

// Built-in parser for JSON bodies
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Root endpoint
app.get("/", (_, res) => {
  res.json({ message: "API Input Validation Demo (Zod + Express)" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

# 1️⃣2️⃣ Run the App

```bash
pnpm run dev
```

---

# 🧪 Test the API

## ✔ Valid Request

```bash
curl -X POST http://localhost:3030/auth/register \
-H "Content-Type: application/json" \
-d "{\"username\": \"fstg\", \"email\": \"john@m.com\", \"password\": \"kmlmwdlankcja89aoijsod\"}"
```

Expected response:

```json
{
  "message": "User registration successful",
  "user": {
    "username": "fstg",
    "email": "john@m.com"
  }
}
```

---

## ❌ Invalid Request Example

```bash
curl -X POST http://localhost:3030/auth/register \
-H "Content-Type: application/json" \
-d "{\"username\": \"fs\", \"email\": \"john.com\", \"password\": \"invalidpasswordthatistoolong123\"}"
```

Expected response:

```json
{
  "error": "Invalid request data",
  "details": [
    {
      "field": "username",
      "message": "Username must be at least 3 chars long"
    },
    { "field": "email", "message": "Invalid email format" },
    { "field": "password", "message": "Password too long" }
  ]
}
```
