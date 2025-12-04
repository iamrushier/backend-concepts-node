# 🚀 Tutorial: Async Patterns in Node.js — Callbacks → Promises → Async/Await

This POC demonstrates how Node.js handles asynchronous operations, specifically:

- Reading and writing files _without blocking the event loop_
- Avoiding callback hell
- Using Promises
- Using async/await for clean code

We will create a project showing **the same logic implemented in 3 ways**.

---

# 1️⃣ Create the Project Folder

```bash
mkdir async-patterns
cd async-patterns
```

---

# 2️⃣ Initialize Project

```bash
pnpm init
```

---

# 3️⃣ Install Dependencies

```bash
pnpm add -D typescript tsx @types/node
```

---

# 4️⃣ Initialize TypeScript Config

```bash
pnpm tsx --init
```

---

# 5️⃣ Configure `package.json`

Open and edit:

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

# 6️⃣ Configure `tsconfig.json`

Update:

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
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

# 7️⃣ Create Folder Structure

```bash
mkdir src
mkdir src/callbacks src/promises src/asyncAwait
```

---

# 8️⃣ Create a Common Sample File

We'll write/read this file in all 3 examples.

```
src/sample.txt
```

Contents:

```
This is a sample text file for async operations.
```

---

# 9️⃣ CALLBACK VERSION

(Traditional Node-style error-first callbacks)

Create:

```
src/callbacks/fileOps.ts
```

Code:

```ts
// src/callbacks/fileOps.ts

import fs from "fs";

/**
 * Reads a file using callback-based async API.
 */
export function readFileCallback(
  path: string,
  callback: (err: NodeJS.ErrnoException | null, data?: string) => void
) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) return callback(err);
    callback(null, data);
  });
}

/**
 * Writes content to a file using callbacks.
 */
export function writeFileCallback(
  path: string,
  content: string,
  callback: (err: NodeJS.ErrnoException | null) => void
) {
  fs.writeFile(path, content, "utf8", (err) => {
    callback(err);
  });
}
```

---

# 🔟 PROMISE VERSION

(Using `fs.promises`)

Create:

```
src/promises/fileOps.ts
```

Code:

```ts
// src/promises/fileOps.ts

import { promises as fs } from "fs";

/**
 * Reads file returning a Promise.
 */
export function readFilePromise(path: string): Promise<string> {
  return fs.readFile(path, "utf8");
}

/**
 * Writes file returning a Promise.
 */
export function writeFilePromise(path: string, content: string): Promise<void> {
  return fs.writeFile(path, content, "utf8");
}
```

---

# 1️⃣1️⃣ ASYNC/AWAIT VERSION

(Clean, modern pattern)

Create:

```
src/asyncAwait/fileOps.ts
```

Code:

```ts
// src/asyncAwait/fileOps.ts

import { promises as fs } from "fs";

/**
 * Reads file using async/await.
 */
export async function readFileAsync(path: string): Promise<string> {
  return await fs.readFile(path, "utf8");
}

/**
 * Writes file using async/await.
 */
export async function writeFileAsync(
  path: string,
  content: string
): Promise<void> {
  await fs.writeFile(path, content, "utf8");
}
```

---

# 1️⃣2️⃣ MAIN ENTRY POINT

This file will run all 3 versions sequentially.

Create:

```
src/index.ts
```

Code:

```ts
// src/index.ts

import { readFileCallback, writeFileCallback } from "./callbacks/fileOps.js";
import { readFilePromise, writeFilePromise } from "./promises/fileOps.js";
import { readFileAsync, writeFileAsync } from "./asyncAwait/fileOps.js";

const sampleFile = "./src/sample.txt";

// ----- CALLBACKS DEMO -----
console.log("\n=== Callback Version ===");

readFileCallback(sampleFile, (err, data) => {
  if (err) return console.error("Callback Read Error:", err);
  console.log("Callback Read:", data);

  const newContent = data + "\n[Callback] File updated successfully!";

  writeFileCallback(sampleFile, newContent, (err) => {
    if (err) return console.error("Callback Write Error:", err);
    console.log("Callback Write: Success!");
  });
});

// ----- PROMISES DEMO -----
console.log("\n=== Promise Version ===");

readFilePromise(sampleFile)
  .then((data) => {
    console.log("Promise Read:", data);
    const newContent = data + "\n[Promise] File updated!";
    return writeFilePromise(sampleFile, newContent);
  })
  .then(() => {
    console.log("Promise Write: Success!");
  })
  .catch((err) => {
    console.error("Promise Error:", err);
  });

// ----- ASYNC/AWAIT DEMO -----
console.log("\n=== Async/Await Version ===");

async function runAsyncAwaitDemo() {
  try {
    const data = await readFileAsync(sampleFile);
    console.log("Async/Await Read:", data);

    const newContent = data + "\n[Async/Await] File updated!";
    await writeFileAsync(sampleFile, newContent);

    console.log("Async/Await Write: Success!");
  } catch (err) {
    console.error("Async/Await Error:", err);
  }
}

runAsyncAwaitDemo();
```

---

# 1️⃣3️⃣ Run the Project

```bash
pnpm run dev
```

You will see:

```
=== Callback Version ===
Callback Read: This is a sample text file for async operations.
Callback Write: Success!

=== Promise Version ===
Promise Read: This is a sample text file...
Promise Write: Success!

=== Async/Await Version ===
Async/Await Read: ...
Async/Await Write: Success!
```

---

# 1️⃣4️⃣ Build for Production

```bash
pnpm run build
```

---

# 1️⃣5️⃣ Run Compiled Code

```bash
pnpm start
```

---
