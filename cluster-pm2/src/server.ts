// src/server.ts
import app from "./app.js";
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Worker ${process.pid} listening on port ${PORT}`);
});
process.on("SIGINT", () => {
  console.log(`Worker ${process.pid} shutting down gracefully`);
  process.exit(0);
});
