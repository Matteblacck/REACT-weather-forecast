import { useEffect, useState } from "react";
import type { HourlyWeather } from "../../05-entities/weather";
import { getWeatherForCity } from "../../07-api/weatherApi";

export default function useThisDayHourlyWeather(city: string, date: string) {
    const [thisDayHourly, setThisDayHourly] = useState<HourlyWeather[]>([]);
  
    useEffect(() => {
      const fetchWeather = async () => {
        try {
          const data = await getWeatherForCity(city);
          const todayData = data.hourlyByDay.find((d: { date: string }) => d.date === date);
          setThisDayHourly(todayData?.hours ?? []);
        } catch (error) {
          console.error("Ошибка при получении погоды:", error);
        }
      };
  
      fetchWeather();
    }, [city, date]); // Added date to dependency array
  
    return thisDayHourly;
  }