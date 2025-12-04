# 🌱 Tutorial: Environment-Based Config Loader Using Dotenv + TypeScript

Modern backend applications must adapt based on **environment**:

- Development
- Production
- Testing

We’ll build a **clean, reusable config system** using:

- **dotenv**
- **cross-env** (to set env vars on any OS)
- **TypeScript**
- **Node.js (no framework)**

---

# 1️⃣ Create Project

```bash
mkdir env-config-loader
cd env-config-loader
```

---

# 2️⃣ Initialize Project

```bash
pnpm init
```

---

# 3️⃣ Install Dependencies

### Runtime:

```bash
pnpm add dotenv
```

### Dev Tools:

```bash
pnpm add -D typescript tsx @types/node cross-env
```

---

# 4️⃣ Initialize TypeScript

```bash
pnpm tsc --init
```

This generates `tsconfig.json`.

---

# 5️⃣ Configure TypeScript

Open `tsconfig.json` and update:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",

    "module": "nodenext",
    "target": "esnext",
    "moduleResolution": "nodenext",

    "types": ["node"],

    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

---

# 6️⃣ Update `package.json` Scripts

```json
{
  "type": "module",
  "main": "index.js",
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx src/server.ts",
    "prod": "cross-env NODE_ENV=production tsx src/server.ts",
    "build": "tsc",
    "start": "cross-env NODE_ENV=production node dist/server.js"
  }
}
```

### Notes:

- `cross-env` ensures `"NODE_ENV=production"` works on all platforms (Windows included)
- `dev` runs without building
- `prod` runs the TypeScript directly but in production mode
- `build + start` is true production run from `dist/`

---

# 7️⃣ Create Environment Files

## 🌐 Base `.env`

> Always loaded first

**File:** `.env`

```
APP_NAME=MyApp
PORT=3000
```

---

## 🛠 Development Overrides

**File:** `.env.development`

```
DB_URL=postgres://dev-db
DEBUG_MODE=true
```

---

## 🚀 Production Overrides

**File:** `.env.production`

```
DB_URL=postgres://prod-db
DEBUG_MODE=false
```

---

# 8️⃣ Create Config Loader

The loader must:

✔ Load `.env` first
✔ Then load environment-specific file
✔ Decide using `NODE_ENV`
✔ Be reusable
✔ Avoid crashes if file is missing

---

### **File: `src/config/loadEnv.ts`**

```ts
import path from "node:path";
import dotenv from "dotenv";

/**
 * Loads base .env first, then an environment-specific override.
 * Controlled via NODE_ENV variable.
 */
export function loadEnv() {
  const env = process.env.NODE_ENV || "development";

  // Always load base .env
  dotenv.config({ path: path.resolve(".env") });

  // Load environment-specific file (.env.development or .env.production)
  const envFile = `.env.${env}`;
  dotenv.config({ path: path.resolve(envFile) });

  console.log(`[ENV] Loaded environment: ${env}`);
}
```

---

# 9️⃣ Create Typed Config Object

We never use `process.env` in app code — only inside this file.

### **File: `src/config/index.ts`**

```ts
import { loadEnv } from "./loadEnv.js";

loadEnv();

/**
 * Strongly typed configuration object
 * Use this everywhere in the rest of the application.
 */
export const config = {
  appName: process.env.APP_NAME || "App",
  port: Number(process.env.PORT) || 3000,
  dbUrl: process.env.DB_URL || "",
  debug: process.env.DEBUG_MODE === "true",
};
```

### Notes:

- Default fallbacks ensure no crash
- `Number(process.env.PORT)` ensures proper typing
- Provides a **single source of truth**

---

# 🔟 Create Server File to Use Config

### **File: `src/server.ts`**

```ts
import http from "node:http";
import { config } from "./config/index.js";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  res.end(
    JSON.stringify({
      message: "Environment Config Loader Demo",
      appName: config.appName,
      port: config.port,
      dbUrl: config.dbUrl,
      debug: config.debug,
      env: process.env.NODE_ENV,
    })
  );
});

server.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
```

---

# 1️⃣1️⃣ Run in Development Mode

```bash
pnpm dev
```

Example output:

```
[ENV] Loaded environment: development
Server started on port 3000
```

---

# 1️⃣2️⃣ Run in Production Mode (without build)

```bash
pnpm prod
```

---

# 1️⃣3️⃣ Build and Start (True Production)

```bash
pnpm build
pnpm start
```

---

# 1️⃣4️⃣ Test the Server

```bash
curl http://localhost:3000
```

You should receive JSON with:

- dev or prod dbUrl
- debug mode correctly set
- environment name

---
