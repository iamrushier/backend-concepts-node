// src/server.ts
import express, { type Express } from "express";
import webhookRoutes from "./routes/webhook.routes.js";

const app: Express = express();
const PORT = 3000;

// Handler raw request body
app.use("/webhook", express.raw({ type: "application/json" }), webhookRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
