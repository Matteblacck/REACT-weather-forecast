import styled from "styled-components";
import Button from "../../../alexeymorgaev/src/04-widgets/CloseButton";
import type { FullDayForecast } from "../05-entities/weather";
import { fluidText } from "../06-shared/utils";
import HourCard from "./HourCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import useThisDayHourlyWeather from "../04-feature/hooks/useThisDayHourly";

interface Props {
  day: FullDayForecast;
  onClose: () => void;
}
const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
const Window = styled.div`
  padding: 15px;
  background-color: white;
  width: 80vw;
  height: 90vh;
  border-radius: 20px;
  @media (max-width: 594px){
    height: 75vh;
  }
`;
const Day = styled.div`
  font-size: ${fluidText(36, 24)};
`;
const InfoRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;

`;

const WeatherCondition = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  text-transform: uppercase;

  h1 {
    font-size: ${fluidText(35, 25)};
    margin: 0;
    color: #333;
    font-weight: 500;
  }

  svg {
    width: 48px;
    height: 48px;
  }
`;

const WeatherDetail = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-size: ${fluidText(18, 12)};
    color: #666;
    margin-bottom: 0.25rem;
  }

  span:last-child {
    font-size: ${fluidText(20, 16)};
    font-weight: 500;
    color: #333;
  }
`;

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
export const WeatherBarWrapper = styled.div`
  left: 0;
  width: 100%;
  
  padding: 0.2rem 0;
  box-sizing: border-box;
  
  background: transparent;
  backdrop-filter: blur(10px);
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
`;

export const FlexContainer = styled.div`
  display: flex;
  min-width: 100%;
  gap: 1rem;
  padding: 0 1rem;
  background: rgba(255, 255, 255, 0.9);
  
`;

function getMatchedIcon(conditionText: string): string {
  const condition = conditionText.toLowerCase();
  return (
    conditionIconMap.find(({ match }) => condition.includes(match))?.icon ||
    "wi:na"
  );
}

export default function DayModal({ day, onClose }: Props) {
  const thisDayDate = String(day.date);
  const dateObj = new Date(thisDayDate);
  const selectedCity = localStorage.getItem("selectedCity") || "MOSCOW";
  const hourlyToday = useThisDayHourlyWeather(selectedCity, thisDayDate);

  const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderThisDayHourly = () => {
    const day = dateObj;

    return hourlyToday
      ?.filter((hour) => new Date(hour.time) >= day)
      .map((hour) => (
        <HourCard
          key={`${hour.time}-${hour.temp_c}`}
          hour={formatTime(hour.time)}
          temp={`+${Math.round(hour.temp_c)}`}
          icon={
            <Icon
              icon={getMatchedIcon(hour.condition.text)}
              width="40"
              height="40"
            />
          }
          wind={`${Math.round(hour.wind_kph ?? 0)} km/h`}
          humidity={`${Math.round(hour.humidity ?? 0)}%`}
        />
      ));
  };

  return (
    <OverlayContainer>
      <Window className="d-flex flex-column">
        {" "}
        {/* Добавлены flex-классы Bootstrap */}
        <div className="d-flex justify-content-between">
          <Day>
            {dateObj
              .toLocaleDateString("en-US", { weekday: "long" })
              .toUpperCase()}
            , {dateObj.getDate()}
          </Day>
          <Button onClick={onClose}>
            <Icon icon="mdi:close" width="20" height="20" />
        </Button>
        </div>
        <div>
        <WeatherCondition>
            <h1>{day.day.condition.text}</h1>
            <Icon
              icon={getMatchedIcon(day.day.condition.text)}
              width="48"
              height="48"
            />
          </WeatherCondition>
        </div>
        <InfoRow>

          <WeatherDetail>
            <span>Min Temperature</span>
            <span>+{day.day.mintemp_c}°C</span>
          </WeatherDetail>

          <WeatherDetail>
            <span>Max Temperature</span>
            <span>+{day.day.maxtemp_c}°C</span>
          </WeatherDetail>

          <WeatherDetail>
            <span>Humidity</span>
            <span>{Math.round(day.day.avghumidity)}%</span>
          </WeatherDetail>

          <WeatherDetail>
            <span>Wind</span>
            <span>{day.day.maxwind_kph} km/h</span>
          </WeatherDetail>

          <WeatherDetail>
            <span>Precipitation</span>
            <span>{day.day.totalprecip_mm} mm</span>
          </WeatherDetail>

          <WeatherDetail>
            <span>Chance of Rain</span>
            <span>{day.day.daily_chance_of_rain}%</span>
          </WeatherDetail>

          <WeatherDetail>
            <span>UV Index</span>
            <span>{day.day.uv}</span>
          </WeatherDetail>

          <WeatherDetail>
            <span>Chance of Snow</span>
            <span>{day.day.daily_chance_of_snow}%</span>
          </WeatherDetail>
        </InfoRow>
        <WeatherBarWrapper className="mt-auto">
          <FlexContainer>{renderThisDayHourly()}</FlexContainer>
        </WeatherBarWrapper>
      </Window>
    </OverlayContainer>
  );
}
