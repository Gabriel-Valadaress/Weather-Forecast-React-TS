import type { ForecastType } from "../../models/forecast.interface";

interface CityForecastProps {
  forecast: ForecastType;
}

export default function CityForecast({ forecast }: CityForecastProps) {
  return (
    <div>
      <h2>Previsão para: {forecast.timezone}</h2>
      <p>Latitude: {forecast.latitude}</p>
      <p>Longitude: {forecast.longitude}</p>
      <p>Elevação: {forecast.elevation}m</p>

      <h3>Temperaturas:</h3>
      <ul>
        {forecast.hourly.time.map((time, index) => (
          <li key={time}>
            {time} - {forecast.hourly.temperature_2m[index]}
            {forecast.hourly_units.temperature_2m}
          </li>
        ))}
      </ul>
    </div>
  );
}
