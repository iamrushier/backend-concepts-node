// src/app.ts
import express, { type Express } from "express";
import userRouter from "./routes/user.routes.js";

const app: Express = express();
app.use(express.json());

// Register routes
app.use("/users", userRouter);

export default app;
