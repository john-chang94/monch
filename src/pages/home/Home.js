import React, { useEffect, useState } from "react";

import { Restaurants } from "../../components/Restaurants";
import { SearchBar } from "../../components/SearchBar";
import { Pagination } from "./Pagination";

import { SpinnerCircular } from "spinners-react";
import { getRestaurants } from "../../services";

export const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(10);

  // Indexes to keep track of pagination
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  // Handle page change
  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    async function fetchData() {
      const restaurants = await getRestaurants();
      setRestaurants(restaurants);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="mt-5 text-center">
          <SpinnerCircular color="#36ad47" size={80} />
        </div>
      ) : (
        <div>
          <div className="main-img">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/monch-63774.appspot.com/o/images%2Freviews%2Ffood-4773380_1920.jpg?alt=media&token=a2dbf087-aee5-41df-908b-cbccc07e2c4d"
              alt="food cover for homepage"
            />
            <p>Discover your favorite eatery</p>
          </div>
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
};
