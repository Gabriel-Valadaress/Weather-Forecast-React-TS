import { useForm } from "react-hook-form";
import citiesCoordinates from "../../data/citiesCoordinates.json";

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
    <form onSubmit={onSubmit}>
      <select {...register("city", { required: "City is required" })}>
        <option value="">Select a city</option>

        {typedCities.map(({ city }) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {errors.city && (
        <p style={{ color: "red" }}>{errors.city.message}</p>
      )}

      <button type="submit">Search</button>
    </form>
  );
}
