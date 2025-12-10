// src/server.ts
import app from "./app.js";
import "./queues/queueEvents.js";

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
