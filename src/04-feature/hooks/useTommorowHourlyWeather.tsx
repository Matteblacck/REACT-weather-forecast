import { useState, useEffect } from "react";
import type { HourlyWeather } from "../../05-entities/weather";
import { getWeatherForCity } from "../../07-api/weatherApi";

export default function useTomorrowHourlyWeather(city: string) {
  const [tomorrowHourly, setTomorrowHourly] = useState<HourlyWeather[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherForCity(city);

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDate = tomorrow.toLocaleDateString("en-CA"); // "YYYY-MM-DD"

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tomorrowData = data.hourlyByDay.find((d: any) => d.date === tomorrowDate);

        setTomorrowHourly(tomorrowData?.hours ?? []);
      } catch (error) {
        console.error("Ошибка при получении завтрашней погоды:", error);
      }
    };

    fetchWeather();
  }, [city]);

  return tomorrowHourly;
}