# 🚀 Tutorial: Build a Basic HTTP Server in Node.js (No Express) Using TypeScript & TSX

This tutorial creates a minimal REST API using only Node’s native `http` module.
You will implement two routes:

- `GET /hello` → returns a greeting
- `GET /time` → returns server time

The project uses:

- **pnpm** (package manager)
- **TypeScript**
- **tsx** (to run TS directly in dev mode)
- **Node.js built-in http module**

---

# 1️⃣ Create the Project Folder

```bash
mkdir basic-http-server
cd basic-http-server
```

---

# 2️⃣ Initialize Project with pnpm

```bash
pnpm init
```

This creates `package.json`.

---

# 3️⃣ Install Dev Dependencies

We need:

- `typescript` – compiler
- `tsx` – run TS without building
- `@types/node` – TypeScript types for Node built-ins

```bash
pnpm add -D typescript tsx @types/node
```

---

# 4️⃣ Initialize TypeScript Config

```bash
pnpm tsx --init
```

This generates a `tsconfig.json`.

---

# 5️⃣ Configure `package.json`

Open `package.json` and update these sections:

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

### Explanation

- `"type": "module"` → enables ES Modules (import syntax)
- `dev` → runs server with tsx (no build needed)
- `build` → compiles TS into JS
- `start` → runs compiled JS

---

# 6️⃣ Fix and Clean Up `tsconfig.json`

Open `tsconfig.json` and apply the following changes:

### ✔️ Enable Node types

### ✔️ Enable ES module resolution for Node

### ✔️ Set correct src and dist folders

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",

    "module": "nodenext",
    "target": "esnext",

    "types": ["node"],

    "strict": true,
    "moduleResolution": "nodenext",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

---

# 7️⃣ Create Project Structure

```bash
mkdir src
```

---

# 8️⃣ Create the Server File

Create:

```
src/server.ts
```

Paste the entire working code below.

---

# 9️⃣ Implement the HTTP Server (No Express!)

```ts
// src/server.ts

import * as http from "http";
import type { IncomingMessage, ServerResponse } from "http";

// Server will listen on this port
const PORT = 3000;

/**
 * The main HTTP server instance.
 * http.createServer() receives a callback that runs on every request.
 */
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const { url, method } = req;

    // Route: GET /hello
    if (url === "/hello" && method === "GET") {
      const data = { message: "Hello! This is raw Node.js HTTP server" };

      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify(data));
    }

    // Route: GET /time
    if (url === "/time" && method === "GET") {
      const data = { serverTime: new Date().toISOString() };

      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify(data));
    }

    // Fallback route for unmatched URLs
    const response = { error: "Route not found" };

    res.writeHead(404, { "content-type": "application/json" });
    return res.end(JSON.stringify(response));
  }
);

// Start the server
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
```

---

# 🔟 Run the Server (Development Mode)

Use tsx to run TypeScript directly:

```bash
pnpm run dev
```

You should see:

```
Listening on PORT 3000
```

---

# 🔍 Test the Routes

## 1. GET /hello

```bash
curl http://localhost:3000/hello
```

Response:

```json
{
  "message": "Hello! This is raw Node.js HTTP server"
}
```

## 2. GET /time

```bash
curl http://localhost:3000/time
```

Response:

```json
{
  "serverTime": "2025-01-01T00:00:00.000Z"
}
```

## 3. Unmatched route

```bash
curl http://localhost:3000/unknown
```

Response:

```json
{
  "error": "Route not found"
}
```

---

# 1️⃣1️⃣ Build (Compile TypeScript)

```bash
pnpm run build
```

Output will be placed in:

```
dist/server.js
```

---

# 1️⃣2️⃣ Run Compiled JS (Production Mode)

```bash
pnpm start
```

---
