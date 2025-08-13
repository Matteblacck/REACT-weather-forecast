import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import Button from "../06-shared/Button";
import RenderContent from "../04-feature/funcs/RenderContent";
import useWeeklyWeather from "../04-feature/hooks/useWeeklyWeather";
import useTodayHourlyWeather from "../04-feature/hooks/useTodayHourlyWeather";
import useTomorrowHourlyWeather from "../04-feature/hooks/useTommorowHourlyWeather";
import { Icon } from "@iconify/react";
import DayModal from "../03-widgets/DayModal";
import type { FullDayForecast } from "../05-entities/weather";
import { fluidText } from "../06-shared/utils";
import {
  cityTimeZones,
  getCurrentLocalHour,
  getLocalDate,
  getLocalTime,
} from "../04-feature/sideFuncs";

const Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: 4.5rem; /* примерно высота WeatherBarWrapper + небольшой отступ */
`;

const MainContent = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  h1 {
    font-size: 2.5rem;
    margin: 0;
    font-weight: 500;
  }

  h3 {
    font-size: 1.5rem;
    margin: 0;
    font-weight: 300;
  }
`;

const MainContentLeftSide = styled.div`
  h1 {
    font-size: ${fluidText(42, 28)};
    text-transform: uppercase;
  }
  h3 {
    font-size: ${fluidText(32, 22)};
  }
`;
const Temp = styled.h1`
  font-size: 3.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
`;
// Добавим кнопку для сворачивания
const ToggleDetailsButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #333;

  &:hover {
    color: gray;
  }
`;
const DetailsWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 80px; /* высота фиксированной панели + запас */
`;
const CollapsibleDetails = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  transition: max-height 0.4s ease;
`;
const WeatherSection = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  margin-top: 1rem;
`;

const TabSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const WeatherBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  
  padding: 0.2rem 0;
  box-sizing: border-box;
  
  background: transparent;
  backdrop-filter: blur(10px);
  z-index: 10;
`;

export const FlexContainer = styled.div`
  display: flex;
  min-width: 100%;
  gap: 1rem;
  padding: 0 1rem;
  background: rgba(255, 255, 255, 0.9);
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding-bottom: 1rem;
`;

const City = styled.h1`
  cursor: pointer;
  font-size: ${fluidText(35, 24)};
  &:hover {
    color: gray;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

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
  z-index: 10;
`;

const CitySelectContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const CitySelectElement = styled.div`
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;
const WeatherDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;

  flex-grow: 1;
  overflow-y: auto;
`;
const WeatherDetail = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-size: ${fluidText(16, 14)};
    color: #666;
    margin-bottom: 0.1rem;
  }

  span:last-child {
    font-size: ${fluidText(18, 16)};
    font-weight: 500;
    color: #333;
  }
`;


export default function MainPage() {
  const [currentTime, setCurrTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("today");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem("selectedCity") || "MOSCOW";
  });
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);
  const cities = ["MOSCOW", "SAINT-PETERSBURG", "IRKUTSK", "NOVOSIBIRSK"];

  // Обновляем время каждую секунду с учетом часового пояса
  useEffect(() => {
    const timer = setInterval(() => {
      const timeZone = cityTimeZones[selectedCity];
      const options = {
        timeZone,
        hour12: false,
      };

      const now = new Date();
      const localTime = new Date(now.toLocaleString("en-US", options));
      setCurrTime(localTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedCity]);

  const currentDay = getLocalDate(selectedCity);
  const timeString = getLocalTime(selectedCity);
  const currentLocalHour = parseInt(getCurrentLocalHour(selectedCity));

  // weather hooks with dynamic city
  const weeklyData = useWeeklyWeather(selectedCity);
  const hourlyToday = useTodayHourlyWeather(selectedCity);
  const hourlyTomorrow = useTomorrowHourlyWeather(selectedCity);

  const todayDetails = weeklyData[0];
  useEffect(() => {
    console.log("todayDetails", todayDetails);
  }, [todayDetails]);
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

  // Находим текущую погоду с учетом локального часа
  const currentWeather = hourlyToday.find((h) => {
    const hour = new Date(h.time).getHours();
    return hour === currentLocalHour;
  });

  const currentTemp = currentWeather
    ? `+${Math.round(currentWeather.temp_c)}°`
    : "--";
  const currentCondition = currentWeather?.condition?.text?.toLowerCase() || "";
  const matchedIcon = conditionIconMap.find(({ match }) =>
    currentCondition.includes(match)
  );
  const currentIcon = matchedIcon?.icon || "wi:na";

  const [selectedDay, setSelectedDay] = useState<FullDayForecast | null>(null);
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);

  const handleDayClick = (day: FullDayForecast) => {
    console.log("Clicked day:", day);
    setSelectedDay(day);
    setIsDayModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedDay(null);
    setIsDayModalOpen(false);
  };
  return (
    <Container className="container">
      <MainContent>
        <MainContentLeftSide>
          <div className="d-flex align-items-center">
            <City onClick={() => setIsMenuOpen(true)}>{selectedCity}</City>
            <h3 className="ms-3">
  {currentDay}, {timeString}
  <span style={{ display: "none" }}>{currentTime.toISOString()}</span>
</h3>
          </div>
          <Temp>
            {currentWeather?.condition.text} {currentTemp}
            <span>
              <Icon icon={currentIcon} width="45" height="45" />
            </span>
          </Temp>
        </MainContentLeftSide>
      </MainContent>

      {/* Кнопка для сворачивания */}
      <ToggleDetailsButton onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
        {isDetailsOpen ? (
          <>
            Hide details <Icon icon="mdi:chevron-up" width="20" height="20" />
          </>
        ) : (
          <>
            Show details <Icon icon="mdi:chevron-down" width="20" height="20" />
          </>
        )}
      </ToggleDetailsButton>

      {/* Контейнер с анимацией */}
      <CollapsibleDetails isOpen={isDetailsOpen}>
      <DetailsWrapper>
      <WeatherDetails>
          <WeatherDetail>
            <span>Min Temperature</span>
            <span>{todayDetails?.day.mintemp_c}°C</span>
          </WeatherDetail>

          <WeatherDetail>
            <span>Max Temperature</span>
            <span>{todayDetails?.day.maxtemp_c}°C</span>
          </WeatherDetail>

          <WeatherDetail>
            <span>Humidity</span>
            <span>{todayDetails?.day.avghumidity}%</span>
          </WeatherDetail>

          <WeatherDetail>
            <span>Wind</span>
            <span>{todayDetails?.day.maxwind_kph}km/h</span>
          </WeatherDetail>

          <WeatherDetail>
            <span>Precipitation</span>
            <span>{todayDetails?.day.totalprecip_mm}mm</span>
          </WeatherDetail>

          <WeatherDetail>
            <span>Chance of Rain</span>
            <span>{todayDetails?.day.totalprecip_mm}%</span>
          </WeatherDetail>

          <WeatherDetail>
            <span>UV Index</span>
            <span>{todayDetails?.day.uv}</span>
          </WeatherDetail>

          <WeatherDetail>
            <span>Sunrise/Sunset</span>
            <span>
              {todayDetails?.astro.sunrise}/{todayDetails?.astro.sunset}
            </span>
          </WeatherDetail>
        </WeatherDetails>
      </DetailsWrapper>
       
      </CollapsibleDetails>

      <WeatherSection>
        <WeatherBarWrapper>
          <div>
            <TabSelector>
              <Button
                onClick={() => setActiveTab("today")}
                active={activeTab === "today"}
              >
                TODAY
              </Button>
              <Button
                onClick={() => setActiveTab("tomorrow")}
                active={activeTab === "tomorrow"}
              >
                TOMORROW
              </Button>
              <Button
                onClick={() => setActiveTab("week")}
                active={activeTab === "week"}
              >
                WEEK
              </Button>
            </TabSelector>
          </div>

          <FlexContainer>
            <RenderContent
              activeTab={activeTab}
              weeklyData={weeklyData}
              hourlyToday={hourlyToday}
              hourlyTomorrow={hourlyTomorrow}
              selectedCity={selectedCity}
              onDayClick={handleDayClick}
            />
          </FlexContainer>
        </WeatherBarWrapper>
      </WeatherSection>

      {isMenuOpen && (
        <OverlayContainer onClick={() => setIsMenuOpen(false)}>
          <CitySelectContent onClick={(e) => e.stopPropagation()}>
            {cities.map((city) => (
              <CitySelectElement
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  setIsMenuOpen(false);
                }}
              >
                {city}
              </CitySelectElement>
            ))}
          </CitySelectContent>
        </OverlayContainer>
      )}
      {isDayModalOpen && selectedDay && (
        <DayModal day={selectedDay} onClose={handleCloseModal} />
      )}
    </Container>
  );
}
