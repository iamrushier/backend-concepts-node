import { redisClient } from "../config/redis.js";
import { env } from "../config/env.js";

export async function getCachedWeather(city: string): Promise<string | null> {
  const cacheKey = `weather:${city.toLowerCase()}`;
  const cachedData = await redisClient.get(cacheKey);
  return cachedData;
}

export async function cacheWeather(city: string, weatherData: string) {
  const cacheKey = `weather:${city.toLowerCase()}`;
  await redisClient.set(cacheKey, weatherData, {
    EX: env.weatherTtl,
  });
}

export async function fetchWeatherFromApi(city: string): Promise<string> {
  const apiKey = env.weatherApiKey;
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
      city
    )}&aqi=no`
  );

  return await response.text();
}

export class WeatherService {
  static async getWeather(city: string): Promise<string> {
    // Check cache first
    const cachedWeather = await getCachedWeather(city);
    if (cachedWeather) {
      console.log(`[WeatherService] Cache hit for city: ${city}`);
      return cachedWeather;
    }
    const weatherData = await fetchWeatherFromApi(city);
    await cacheWeather(city, weatherData);
    console.log(
      `[WeatherService] Cache miss for city: ${city}. Fetched from API.`
    );
    return weatherData;
  }
}
