import styled from "styled-components";
import DayCard from "../../03-widgets/DayCard";
import HourCard from "../../03-widgets/HourCard";
import type { DayForecast, FullDayForecast, HourlyWeather } from "../../05-entities/weather";
import { Icon } from "@iconify/react";

const WeatherBarInner = styled.div`
  display: flex;
  width: fit-content;
  margin: 0 auto;
  padding: 0 1rem;
  background-color: white;
`;

interface Props {
  activeTab: string;
  weeklyData?: DayForecast[];
  hourlyToday?: HourlyWeather[];
  hourlyTomorrow?: HourlyWeather[];
  selectedCity: string; // Добавляем пропс для выбранного города
  onDayClick?: (day: FullDayForecast) => void;
}

const cityTimeZones: Record<string, string> = {
  "MOSCOW": "Europe/Moscow",
  "SAINT-PETERSBURG": "Europe/Moscow",
  "IRKUTSK": "Asia/Irkutsk",
  "NOVOSIBIRSK": "Asia/Novosibirsk"
};

const conditionIconMap: { match: string; icon: string }[] = [
  { match: "sunny", icon: "wi:day-sunny" },
  { match: "clear", icon: "wi:night-clear" },
  { match: "partly", icon: "wi:day-cloudy" },
  { match: "cloudy", icon: "wi:cloudy" },
  { match: "overcast", icon: "wi:cloudy" },
  { match: "rain", icon: "wi:rain" },
  { match: "snow", icon: "wi:snow" },
  { match: "thunder", icon: "wi:thunderstorm" },
  { match: "mist", icon: "wi:fog" },
];

function getMatchedIcon(conditionText: string): string {
  const condition = conditionText.toLowerCase();
  return conditionIconMap.find(({ match }) => condition.includes(match))?.icon || "wi:na";
}

export default function RenderContent({
  activeTab,
  weeklyData,
  hourlyToday,
  hourlyTomorrow,
  selectedCity, // Получаем выбранный город из пропсов
  onDayClick,
}: Props) {
  // Функция для форматирования времени с учетом часового пояса
  const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString("ru-RU", {
      timeZone: cityTimeZones[selectedCity],
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Функция для получения текущего времени с учетом часового пояса
  const getCurrentLocalTime = () => {
    return new Date().toLocaleString("en-US", {
      timeZone: cityTimeZones[selectedCity],
    });
  };

  const renderWeeklyCards = () =>
    weeklyData?.map((day) => (
      <DayCard
        key={day.date}
        onClick={() => onDayClick?.(day)} 
        day={new Date(day.date).toLocaleDateString("en-EN", { 
          timeZone: cityTimeZones[selectedCity],
          weekday: "long" 
        })}
        mintemp={`+${Math.round(day.day.mintemp_c)}`}
        maxtemp={`+${Math.round(day.day.maxtemp_c)}`}
        icon={<Icon icon={getMatchedIcon(day.day.condition.text)} width="40" height="40" />}
        wind={`${Math.round(day.day.maxwind_kph)} km/h`}
        humidity={`${Math.round(day.day.avghumidity)}%`}

      />
    ));

  const renderTodayHourly = () => {
    const now = new Date(getCurrentLocalTime());

    return hourlyToday
      ?.filter((hour) => new Date(hour.time) >= now)
      .map((hour) => (
        <HourCard
          key={`${hour.time}-${hour.temp_c}`}
          hour={formatTime(hour.time)}
          temp={`+${Math.round(hour.temp_c)}`}
          icon={<Icon icon={getMatchedIcon(hour.condition.text)} width="40" height="40" />}
          wind={`${Math.round(hour.wind_kph ?? 0)} km/h`}
          humidity={`${Math.round(hour.humidity ?? 0)}%`}
        />
      ));
  };

  const renderTomorrowHourly = () =>
    hourlyTomorrow?.map((hour) => (
      <HourCard
        key={`${hour.time}-${hour.temp_c}`}
        hour={formatTime(hour.time)}
        temp={`+${Math.round(hour.temp_c)}`}
        icon={<Icon icon={getMatchedIcon(hour.condition.text)} width="40" height="40" />}
        wind={`${Math.round(hour.wind_kph ?? 0)} km/h`}
        humidity={`${Math.round(hour.humidity ?? 0)}%`}
      />
    ));

  switch (activeTab) {
    case "week":
      return <WeatherBarInner>{renderWeeklyCards()}</WeatherBarInner>;
    case "today":
      return <WeatherBarInner>{renderTodayHourly()}</WeatherBarInner>;
    case "tomorrow":
      return <WeatherBarInner>{renderTomorrowHourly()}</WeatherBarInner>;
    default:
      return <WeatherBarInner>{renderWeeklyCards()}</WeatherBarInner>;
  }
}