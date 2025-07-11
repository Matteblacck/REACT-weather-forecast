export interface HourlyWeather {
    time: string; // Например, "2025-06-25 14:00"
    temp_c: number; // Температура в °C
    condition: {
      text: string; // Описание погоды, например, "Partly cloudy"
      icon: string; // URL иконки погоды
    };
    wind_kph?: number;   // Скорость ветра в км/ч (опционально)
    humidity?: number;   // Влажность в % (опционально)
  }
  export interface DayForecast {
    date: string; // например, "2025-06-25"
    day: {
      avgtemp_c: number;
      maxtemp_c: number;
      mintemp_c: number;
      maxwind_kph: number;
      avghumidity: number;
      condition: {
        text: string;
        icon: string; // уже абсолютная ссылка
      };
    };
  }