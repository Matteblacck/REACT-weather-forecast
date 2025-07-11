import { useEffect, useState } from "react";
import { getWeatherForCity } from "../../07-api/weatherApi";
import type { DayForecast } from "../../05-entities/weather";


export default function useWeeklyWeather(city: string) {
  const [week, setWeek] = useState<DayForecast[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getWeatherForCity(city);
        setWeek(data.daily.slice(0, 7)); // Только 7 дней
      } catch (error) {
        console.error("Ошибка прогноза:", error);
      }
    };

    fetch();
  }, [city]);

  return week;
}