import { useForm } from "react-hook-form";
import citiesCoordinates from "../../data/citiesCoordinates.json";
import "./styles.css";

interface City {
  city: string;
  latitude: number;
  longitude: number;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

type FormValues = {
  city: string;
};

interface Props {
  onSubmitCoordinates: (coords: Coordinates) => void;
}

const typedCities: City[] = citiesCoordinates;

export default function CityOptions({ onSubmitCoordinates }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    const selectedCity = typedCities.find(
      (c) => c.city === data.city
    );

    if (!selectedCity) return;

    onSubmitCoordinates({
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude,
    });
  });

  return (
    <form onSubmit={onSubmit} className="formContainer">
      <div className="selectWrapper">
        <select 
          {...register("city", { required: "City is required" })}
          className="select"
        >
          <option value="">Select a city</option>

          {typedCities.map(({ city }) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {errors.city && (
          <p className="errorMessage">{errors.city.message}</p>
        )}
      </div>

      <button type="submit" className="submitButton">Search</button>
    </form>
  );
}