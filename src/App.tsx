import { useState } from "react";
import type { ForecastType } from "./models/forecast.interface";
import { Forecast } from "./api/api";
import CityForecast from "./components/cityForecast";
import CityOptions from "./components/cityOptions";
import "./App.css";

export default function App() {
  const [forecast, setForecast] = useState<ForecastType>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCoordinates = async ({ latitude, longitude }: {
    latitude: number;
    longitude: number;
  }) => {
    setIsLoading(true);
    setIsError(false);
    setForecast(undefined);

    try {
      const forecastData = await Forecast.getForecast(latitude, longitude);
      setForecast(forecastData);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Weather forecast</h1>

      <CityOptions onSubmitCoordinates={handleCoordinates} />

      {isLoading && <p className="loadingMessage">Loading...</p>}
      {isError && <p className="errorMessage">Error loading forecast</p>}
      {forecast && <CityForecast forecast={forecast} />}
    </>
  );
};