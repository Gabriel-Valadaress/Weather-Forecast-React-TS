import type { ForecastType } from "../../models/forecast.interface";
import "./styles.css";

interface CityForecastProps {
  forecast: ForecastType;
}

export default function CityForecast({ forecast }: CityForecastProps) {
  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Previsão para: {forecast.timezone}</h2>
      </div>

      <div className="info">
        <div className="infoItem">
          <div className="infoLabel">Latitude</div>
          <div className="infoValue">{forecast.latitude}°</div>
        </div>
        <div className="infoItem">
          <div className="infoLabel">Longitude</div>
          <div className="infoValue">{forecast.longitude}°</div>
        </div>
        <div className="infoItem">
          <div className="infoLabel">Elevação</div>
          <div className="infoValue">{forecast.elevation}m</div>
        </div>
      </div>

      <div className="temperaturesSection">
        <h3 className="temperaturesTitle">Temperaturas:</h3>
        <ul className="temperaturesList">
          {forecast.hourly.time.map((time, index) => (
            <li key={time} className="temperatureItem">
              <span className="temperatureTime">{time}</span>
              <span className="temperatureValue">
                {forecast.hourly.temperature_2m[index]}
                {forecast.hourly_units.temperature_2m}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}