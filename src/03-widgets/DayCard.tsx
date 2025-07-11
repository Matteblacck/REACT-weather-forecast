import styled from "styled-components";
import { Icon } from '@iconify/react';

interface DayCardProps {
  day: string;
  mintemp: string;
  maxtemp: string;
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
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.3);
  @media (max-width: 768px) {
    min-width: 140px;
    padding: 1rem 0.75rem;
    h3 {
    margin-bottom: 3px;
    font-size: 1rem;
    font-weight: 600;
    color: #2c3e50;
  }
  .icon {
    font-size: 2rem;
    margin: 0 0 12px 0;
    line-height: 1;
  }
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid gray;
  }

  h3 {
    margin-bottom: 12px;
    font-size: 1rem;
    font-weight: 600;
    color: #2c3e50;
  }

  .icon {
    font-size: 2.5rem;
    margin: 0 0 12px 0;
    line-height: 1;
  }
  

  .temp {
    font-size: 1.5rem;
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
`;

export default function DayCard({ day, mintemp, maxtemp, icon, wind, humidity }: DayCardProps) {
    return (
      <Card>
        <h3>{day.toUpperCase()}</h3>
        <div className="icon">
          {icon}
        </div>
        <p className="temp">{mintemp}/{maxtemp}</p>
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