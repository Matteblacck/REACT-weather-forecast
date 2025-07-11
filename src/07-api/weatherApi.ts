import axios from "axios";

const API_KEY = "41f47db0fa0d40d083a122745252506"; // 🔑 Вставь сюда свой реальный ключ
const BASE_URL = "https://api.weatherapi.com/v1";

// Создаём экземпляр axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Получение прогноза по названию города
export async function getWeatherForCity(city: string) {
  const response = await axiosInstance.get("/forecast.json", {
    params: {
      key: API_KEY,
      q: city,
      days: 7,           // Прогноз на 7 дней
      lang: "en",
    },
  });

  const { location, current, forecast } = response.data;

  return {
    location: `${location.name}, ${location.country}`,
    current,
    daily: forecast.forecastday,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hourlyByDay: forecast.forecastday.map((day: any) => ({
      date: day.date,
      hours: day.hour,
    })),
  };
}