import { useContext, useEffect, useState } from "react";
import Header from "./components/header/Header";
import WeatherBoard from "./components/weather/WeatherBoard";
import { WeatherContext } from "./context";

import ClearSkyImage from "./assets/backgrounds/clear-sky.jpg";
import FewCloudsImage from "./assets/backgrounds/few-clouds.jpg";
import MistImage from "./assets/backgrounds/mist.jpeg";
import RainyDayImage from "./assets/backgrounds/rainy-day.jpg";
import ScatterdCloudsImage from "./assets/backgrounds/scattered-clouds.jpg";
import SnowImage from "./assets/backgrounds/snow.jpg";
import ThunderstormImage from "./assets/backgrounds/thunderstorm.jpg";
import WinterImage from "./assets/backgrounds/winter.jpg";

function Page() {
  const { weatherData, loading } = useContext(WeatherContext);
  const [climateImage, setClimateImage] = useState("");
  function getBackgroundImage(climate) {
    switch (climate) {
      case "Clear":
        return ClearSkyImage;
      case "Clouds":
        return FewCloudsImage;
      case "Haze":
        return FewCloudsImage;
      case "Mist":
        return MistImage;
      case "Rain":
        return RainyDayImage;
      case "Scattered Clouds":
        return ScatterdCloudsImage;
      case "Thunderstorm":
        return ThunderstormImage;
      case "Snow":
        return SnowImage;
      case "Winter":
        return WinterImage;
      default:
        return ClearSkyImage;
    }
  }
  useEffect(() => {
    const bgImage = getBackgroundImage(weatherData.climate);
    setClimateImage(bgImage);
  }, [weatherData.climate]);

  return (
    <>
      {loading.state ? (
        <div className="flex bg-gray-200 rounded-md w-96 mt-14 mx-auto">
          <p className="text-center text-3xl text-black">{loading.message}</p>
        </div>
      ) : (
        <div
          style={{ backgroundImage: `url('${climateImage}')` }}
          className="grid place-items-center h-screen bg-no-repeat bg-cover"
        >
          <Header />
          <main>
            <section>
              <WeatherBoard />
            </section>
          </main>
        </div>
      )}
    </>
  );
}

export default Page;
