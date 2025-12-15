// src/app.ts
import express, { type Express } from "express";
import userRoutes from "./routes/user.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";

const app: Express = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
