// src/server.ts
import * as http from "http";
import type { IncomingMessage, ServerResponse } from "http";

const PORT = 3000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const { url, method } = req;
    if (url === "/hello" && method === "GET") {
      const data = { message: "Hello! This is raw Node.js HTTP server" };
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify(data));
    }
    if (url === "/time" && method === "GET") {
      const data = { serverTime: new Date().toISOString() };
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify(data));
    }
    const response = {
      error: "Route not found",
    };
    res.writeHead(404, { "content-type": "application/json" });
    return res.end(JSON.stringify(response));
  }
);

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
