import express from "express";
import weatherRoutes from "./routes/weather.routes.js";
import { connectRedis } from "./config/redis.js";
import { env } from "./config/env.js";
// const app = express();
const PORT = env.port || 6000;

async function start() {
  await connectRedis();

  const app = express();
  app.use(express.json());

  app.use("/weather", weatherRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();
