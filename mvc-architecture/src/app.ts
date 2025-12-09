import express from "express";
import type { Express } from "express";
import productRouter from "./routes/product.routes.js";

const app: Express = express();

app.use(express.json());
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.json({ message: "MV Architecture API" });
});

export default app;
