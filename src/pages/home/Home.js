import React, { useEffect, useState } from "react";
import { getRestaurants } from "../../services";

import Restaurants from "../../components/Restaurants";

import { SpinnerCircular } from "spinners-react";
import { Pagination } from "./Pagination";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(10);

  // Indexes to keep track of pagination
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  // Handle
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
          <p>Featured</p>
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
