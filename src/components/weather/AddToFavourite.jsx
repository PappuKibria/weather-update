import { useContext, useEffect, useState } from "react";
import RedHeartIcon from "../../assets/heart-red.svg";
import HeartIcon from "../../assets/heart.svg";
import { FavouriteContext, WeatherContext } from "../../context";

function AddToFavourite() {
  const { addFavourite, removeFavourite, favourites } =
    useContext(FavouriteContext);

  const { weatherData } = useContext(WeatherContext);
  const [isFavourite, setIsFavourite] = useState(false);
  const { latitude, longitude, location } = weatherData;

  useEffect(() => {
    console.log(favourites);
    const found = favourites.find((item) => item.location === location);
    setIsFavourite(found);
  }, []);

  function handleFavouriteToggle() {
    const found = favourites.find((item) => item.location === location);
    if (!found) {
      addFavourite(latitude, longitude, location);
    } else {
      removeFavourite(location);
    }
    setIsFavourite(!isFavourite);
  }

  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-end space-x-6">
        <button
          className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D]"
          onClick={handleFavouriteToggle}
        >
          <span>Add to Favourite</span>
          <img src={isFavourite ? RedHeartIcon : HeartIcon} alt="heart" />
        </button>
      </div>
    </div>
  );
}

export default AddToFavourite;
