import { useEffect, useState } from "react";
import type { HourlyWeather } from "../../05-entities/weather";
import { getWeatherForCity } from "../../07-api/weatherApi";

export default function useTodayHourlyWeather(city: string) {
  const [todayHourly, setTodayHourly] = useState<HourlyWeather[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherForCity(city);

        const todayDate = new Date().toLocaleDateString("en-CA"); // "2025-06-25"

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const todayData = data.hourlyByDay.find((d: any) => d.date === todayDate);

        setTodayHourly(todayData?.hours ?? []);
      } catch (error) {
        console.error("Ошибка при получении погоды:", error);
      }
    };

    fetchWeather();
  }, [city]);

  return todayHourly;
}