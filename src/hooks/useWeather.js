import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState({
    location: "",
    climate: "",
    temperature: "",
    maxTemparature: "",
    minTemparature: "",
    humidity: "",
    cloudPercentage: "",
    wind: "",
    time: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState({
    state: false,
    message: "Loading weather data...",
  });

  const [error, setError] = useState(null);

  const { selectedLocation } = useContext(LocationContext);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setLoading({
        ...loading,
        state: true,
        message: "Fetching weather data...",
      });
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status}`);
      }
      const data = await response.json();
      const updateWeatherData = {
        ...weatherData,
        location: data.name,
        climate: data?.weather[0]?.main,
        temperature: data?.main?.temp,
        maxTemparature: data?.main?.temp_max,
        minTemparature: data?.main?.temp_min,
        humidity: data?.main?.humidity,
        cloudPercentage: data?.clouds?.all,
        wind: data?.wind?.speed,
        time: data?.dt,
        latitude: latitude,
        longitude: longitude,
      };
      setWeatherData(updateWeatherData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading({
        ...loading,
        state: false,
        message: "",
      });
    }
  };
  useEffect(() => {
    setLoading({
      ...loading,
      state: true,
      message: "Fetching your location...",
    });

    if (
      selectedLocation &&
      selectedLocation.latitude &&
      selectedLocation.longitude
    ) {
      fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude);
    } else {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        function (error) {
          setError(`Geolocation error: ${error.message}`);
          setLoading({
            ...loading,
            state: false,
            message: "",
          });
        }
      );
    }
  }, [selectedLocation.latitude, selectedLocation.longitude]);
  return { weatherData, error, loading };
};

export default useWeather;
