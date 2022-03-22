import React, { createContext, useState, useEffect, useContext } from "react";
import { getRestaurants } from "../services";

const RestaurantsContext = createContext();

export const useRestaurants = () => useContext(RestaurantsContext); // Custom hook

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState(null); // Firebase auth user object
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        const restaurants = await getRestaurants();
        setRestaurants(restaurants);
        setIsLoading(false);
    }

    fetchData();
  }, [restaurants]);

  return (
    <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
      {!isLoading && children}
    </RestaurantsContext.Provider>
  );
};
