// src/app.ts
import express, { type Express } from "express";
import departmentRoutes from "./routes/department.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

const app: Express = express();
app.use(express.json());

app.use("/employees", employeeRoutes);
app.use("/departments", departmentRoutes);

export default app;
