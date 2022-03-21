import React, { useEffect, useState } from "react";
import { getRestaurants } from "../../services";

import { Restaurants } from "../../components/Restaurants";
import { SearchBar } from "../../components/SearchBar";
import { Pagination } from "./Pagination";

import { SpinnerCircular } from "spinners-react";

export const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(10);

  // Indexes to keep track of pagination
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  // Handle page change
  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const handleFetchData = async () => {
      const restaurants = await getRestaurants();
      setRestaurants(restaurants);
      setIsLoading(false);
    };

    handleFetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="mt-5 text-center">
          <SpinnerCircular color="#36ad47" size={80} />
        </div>
      ) : (
        <div>
          <SearchBar />
          <h3 className="green-darken-3 my-3">Featured</h3>
          <Restaurants restaurants={currentRestaurants} />
          <Pagination
            restaurantsPerPage={restaurantsPerPage}
            totalRestaurants={restaurants.length}
            handlePaginate={handlePaginate}
          />
        </div>
      )}
    </div>
  );
}
