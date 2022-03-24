import React, { createContext, useState, useEffect, useContext } from "react";
import { getRestaurants } from "../services";

const RestaurantsContext = createContext();

export const useRestaurants = () => useContext(RestaurantsContext); // Custom hook

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState(null); // Initial fetch for all restaurants
  const [searchResults, setSearchResults] = useState([]); // Store user's search results
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        const restaurants = await getRestaurants();
        setRestaurants(restaurants);
        setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <RestaurantsContext.Provider value={{ restaurants, searchResults, setSearchResults }}>
      {!isLoading && children}
    </RestaurantsContext.Provider>
  );
};
