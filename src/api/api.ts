import axios, { type AxiosResponse } from "axios";
import type { ForecastType } from "../models/forecast.interface";

const instance = axios.create({
  baseURL: "https://api.open-meteo.com/v1/forecast",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

export const Forecast = {
  getForecast: (latitude: number, longitude: number): Promise<ForecastType> => {
    return instance.get("", {
      params: {
        latitude,
        longitude,
        hourly: "temperature_2m"
      }
    }).then(responseBody);
  },
};