# **Caching with Redis — Weather API (TypeScript + Express + Redis + pnpm + tsx)**

A complete POC that shows:

- Connecting Express → Redis
- Caching weather API responses
- TTL-based caching
- Avoiding redundant external API calls
- Twelve-factor compliant environment management

Everything is shown **in the exact order it must be created** so the project runs without errors **on first try**.

---

# ✅ **1. Project Setup**

### **Create project folder**

```sh
mkdir redis-weather-api
cd redis-weather-api
```

### **Initialize the project**

```sh
pnpm init
```

---

# ✅ **2. Install Dependencies**

### **App dependencies**

```sh
pnpm add express redis cross-env dotenv
```

### **Dev dependencies**

```sh
pnpm add -D typescript tsx @types/node @types/express
```

### **Initialize TypeScript**

```sh
pnpm tsc --init
```

---

# ✅ **3. Configure TypeScript**

Edit **tsconfig.json**:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",

    "module": "nodenext",
    "moduleResolution": "nodenext",

    "target": "esnext",

    "strict": true,
    "esModuleInterop": true,

    "types": ["node"]
  }
}
```

---

# ✅ **4. Update package.json Scripts**

Modify **package.json**:

```json
{
  "type": "module",
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

---

# ✅ **5. Create Environment Files**

Create **.env**:

```
PORT=5050
REDIS_URL=redis://localhost:6379
WEATHER_TTL=30
WEATHER_API_KEY=YOUR_WEATHER_API_KEY_HERE
```

⚠️ Replace `YOUR_WEATHER_API_KEY_HERE` with a working key from
[https://www.weatherapi.com/](https://www.weatherapi.com/)

---

# ✅ **6. Create `src/config/env.ts`**

Environment loader module (never access `process.env` outside this file):

```ts
// src/config/env.ts
import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5050,
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  weatherTtl: Number(process.env.WEATHER_TTL) || 30, // minutes
  weatherApiKey: process.env.WEATHER_API_KEY || "",
};
```

---

# ✔️ **7. Create Redis Client Provider**

### File: **src/config/redis.ts**

```ts
// src/config/redis.ts
import { createClient } from "redis";
import { env } from "./env.js";

export const redisClient = createClient({
  url: env.redisUrl,
});

redisClient.on("error", (err) => {
  console.error("[Redis] Error:", err);
});

export async function connectRedis() {
  await redisClient.connect();
  console.log("[Redis] Connected to Redis server");
}
```

---

# ✔️ **8. Weather Service (Caching + External API)**

### File: **src/services/weather.service.ts**

```ts
// src/services/weather.service.ts
import { redisClient } from "../config/redis.js";
import { env } from "../config/env.js";

export async function getCachedWeather(city: string): Promise<string | null> {
  const key = `weather:${city.toLowerCase()}`;
  return await redisClient.get(key);
}

export async function cacheWeather(city: string, weatherData: string) {
  const key = `weather:${city.toLowerCase()}`;

  await redisClient.set(key, weatherData, {
    EX: env.weatherTtl, // TTL in seconds
  });
}

export async function fetchWeatherFromApi(city: string): Promise<string> {
  const apiKey = env.weatherApiKey;

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
    city
  )}&aqi=no`;

  const response = await fetch(url);

  return await response.text();
}

export class WeatherService {
  static async getWeather(city: string): Promise<string> {
    const cached = await getCachedWeather(city);

    if (cached) {
      console.log(`[WeatherService] Cache HIT for ${city}`);
      return cached;
    }

    console.log(`[WeatherService] Cache MISS for ${city}`);
    const data = await fetchWeatherFromApi(city);

    await cacheWeather(city, data);

    return data;
  }
}
```

---

# ✔️ **9. Weather Route**

### File: **src/routes/weather.routes.ts**

```ts
// src/routes/weather.routes.ts
import { Router } from "express";
import { WeatherService } from "../services/weather.service.js";

const router = Router();

router.get("/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const weatherData = await WeatherService.getWeather(city);
    res.json(JSON.parse(weatherData));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
```

---

# ✔️ **10. Create Server**

### File: **src/server.ts**

```ts
// src/server.ts
import express from "express";
import weatherRoutes from "./routes/weather.routes.js";
import { connectRedis } from "./config/redis.js";
import { env } from "./config/env.js";

async function startServer() {
  await connectRedis();

  const app = express();
  app.use(express.json());

  app.use("/weather", weatherRoutes);

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
}

startServer();
```

---

# 🚀 **11. Start the Project**

### Development mode:

```sh
pnpm dev
```

### Build + Run Production:

```sh
pnpm build
pnpm start
```

---

# 🎯 **12. Test the API**

Visit:

```
http://localhost:5050/weather/london
```

### 1st request → Cache MISS (calls external API)

### Next requests → Cache HIT (returns instantly)

---
