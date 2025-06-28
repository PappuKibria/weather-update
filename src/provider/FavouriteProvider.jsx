import { FavouriteContext } from "../context";
import { useLocalStorage } from "../hooks";

const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage("favourites", []);

  const addFavourite = (latitude, longitude, location) => {
    setFavourites([
      ...favourites,
      {
        latitude: latitude,
        longitude: longitude,
        location: location,
      },
    ]);
  };

  const removeFavourite = (location) => {
    const restFavourites = favourites.filter(
      (item) => item.location !== location
    );
    setFavourites(restFavourites);
  };

  return (
    <FavouriteContext.Provider
      value={{ addFavourite, removeFavourite, favourites }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteProvider;
