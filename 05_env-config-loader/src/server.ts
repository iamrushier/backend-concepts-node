// src/server.ts
import http from "node:http";
import { config } from "./config/index.js";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  res.end(
    JSON.stringify({
      message: "Environment Config Loader",
      appName: config.appName,
      port: config.port,
      dbUrl: config.dbUrl,
      debug: config.debug,
      env: process.env.NODE_ENV,
    })
  );
});

server.listen(config.port, () => {
  console.log(`Server started on ${config.port}`);
});
