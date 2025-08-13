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
  
  export interface FullDayForecast {
    date: string; // например, "2025-06-25"
    day: {
      avgtemp_c: number;
      maxtemp_c: number;
      mintemp_c: number;
      maxwind_kph: number;
      minwind_kph: number;
      avghumidity: number;
      condition: {
        text: string;
        icon: string; // уже абсолютная ссылка
      };
      pressure_mb?: number;        // давление в миллибарах (необязательно)
      pressure_in?: number;        // давление в дюймах ртутного столба (необязательно)
      daily_chance_of_rain?: number;   // вероятность дождя в % (необязательно)
      daily_chance_of_snow?: number;   // вероятность снега в % (необязательно)
      uv?: number;                 // индекс ультрафиолета (необязательно)
      totalprecip_mm?: number;
      cloudcover?: number;  // Добавлено: облачность в процентах (необязательно)
    };
  }
  export interface DayForecast extends FullDayForecast {
    date: string; // например, "2025-06-25"
    astro: {
      sunrise: number;
      sunset: number
    }
  
  }