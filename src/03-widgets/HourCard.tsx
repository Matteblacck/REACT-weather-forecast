import styled from "styled-components";
import { Icon } from "@iconify/react";

interface HourCardProps {
  hour: string;
  temp: string;
  icon: React.ReactNode;
  wind: string;
  humidity: string;
}

const Card = styled.div`
  min-width: 175px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 1.5rem 1rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
 

  h3 {
    margin: 0 0 12px 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #2c3e50;
  }

  .icon {
    font-size: 3rem;
    margin: 0 0 12px 0;
    line-height: 1;
  }

  .temp {
    font-size: 1.7rem;
    font-weight: 400;
    margin: 0 0 16px 0;
    color: var(--color-text);
    position: relative;
  }

  .details {
    display: flex;
    justify-content: space-around;
    font-size: 0.9rem;
    color: #7f8c8d;

    div {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
  @media (max-width: 768px) {
    min-width: 140px;
    padding: 1rem 0.75rem;
    h3 {
      margin-bottom: 2px;
      font-size: 1rem;
      font-weight: 600;
      color: #2c3e50;
    }
    .icon {
      margin: 0 0 12px 0;
      line-height: 1;
    }
  }
`;

export default function DayCard({
  hour,
  temp,
  icon,
  wind,
  humidity,
}: HourCardProps) {
  return (
    <Card>
      <h3>{hour}</h3>
      <div className="icon">{icon}</div>
      <p className="temp">{temp}</p>
      <div className="details">
        <div title="Wind speed">
          <Icon icon="wi:strong-wind" width="18" height="18" /> {wind}
        </div>
        <div title="Humidity">
          <Icon icon="wi:humidity" width="18" height="18" /> {humidity}
        </div>
      </div>
    </Card>
  );
}
