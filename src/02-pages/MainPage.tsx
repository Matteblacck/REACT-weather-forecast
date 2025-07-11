import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import Button from "../06-shared/Button";
import RenderContent from "../04-feature/funcs/RenderContent";
import useWeeklyWeather from "../04-feature/hooks/useWeeklyWeather";
import useTodayHourlyWeather from "../04-feature/hooks/useTodayHourlyWeather";
import useTomorrowHourlyWeather from "../04-feature/hooks/useTommorowHourlyWeather";
import { Icon } from "@iconify/react";

const Container = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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

const MainContentLeftSide = styled.div``;

const MainContentRightSide = styled.div`
  padding-top: 2vh;
`;

const Temp = styled.p`
  font-size: 3.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const WeatherSection = styled.div`
  position: absolute;
  bottom: 5%;
  width: 100%;
`;

const TabSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const WeatherBarWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.5rem 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
`;

const FlexContainer = styled.div`
  display: flex;
  min-width: 100%;
  gap: 1rem;
  padding: 0 1rem;
`;

const City = styled.h1`
  cursor: pointer;
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

export default function MainPage() {
  const [currentTime, setCurrTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("today");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem("selectedCity") || "MOSCOW";
  });
  
  useEffect(() => {
    localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);
  const cities = ["MOSCOW", "SAINT-PETERSBURG", "IRKUTSK", "NOVOSIBIRSK"];

  

  // save selected city to localStorage
  useEffect(() => {
    localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);

  // update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentDay = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const timeString = currentTime.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // weather hooks with dynamic city
  const weeklyData = useWeeklyWeather(selectedCity);
  const hourlyToday = useTodayHourlyWeather(selectedCity);
  const hourlyTomorrow = useTomorrowHourlyWeather(selectedCity);

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

  const currentHour = new Date().getHours();
  const currentWeather = hourlyToday.find(
    (h) => new Date(h.time).getHours() === currentHour
  );
  const currentTemp = currentWeather
    ? `+${Math.round(currentWeather.temp_c)}°`
    : "--";
  const currentCondition = currentWeather?.condition?.text?.toLowerCase() || "";
  const matchedIcon = conditionIconMap.find(({ match }) =>
    currentCondition.includes(match)
  );
  const currentIcon = matchedIcon?.icon || "wi:na";

  return (
    <Container className="container">
      <MainContent>
        <MainContentLeftSide>
          <City onClick={() => setIsMenuOpen(true)}>{selectedCity}</City>
          <h3>
            {currentDay}, {timeString}
          </h3>
        </MainContentLeftSide>

        <MainContentRightSide>
          <Temp>
            {currentTemp}
            <Icon icon={currentIcon} width="64" height="64" />
          </Temp>
        </MainContentRightSide>
      </MainContent>

      <WeatherSection>
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

        <WeatherBarWrapper>
          <FlexContainer>
            <RenderContent
              activeTab={activeTab}
              weeklyData={weeklyData}
              hourlyToday={hourlyToday}
              hourlyTomorrow={hourlyTomorrow}
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
    </Container>
  );
}