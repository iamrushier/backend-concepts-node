import express from "express";
import routes from "./routes/demoRoutes";
import { globalErrorHandler } from "./errors/errorHandler";
const app = express();

app.use(express.json());
app.use("/demo", routes);

// Global error handler at end
app.use(globalErrorHandler);

export default app;
