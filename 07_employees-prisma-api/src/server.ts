// src/server.ts
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
