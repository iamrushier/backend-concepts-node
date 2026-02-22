import { Router } from "express";
import { WeatherService } from "../services/weather.service.js";

const router: Router = Router();
router.get("/:city", async (req, res) => {
  const city = req.params.city;
  console.log(city);
  try {
    const weatherData = await WeatherService.getWeather(city);
    res.json(JSON.parse(weatherData));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
