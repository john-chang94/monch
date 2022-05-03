import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SearchBar } from "../../components/SearchBar";
import { Restaurants } from "../../components/Restaurants";
import { Pagination } from "../../components/Pagination";
import { Filters } from "./Filters";

import {
  getSearchResults,
  getPriceFilteredResults,
  getRatingFilteredResults,
  getPriceAndRatingFilteredResults,
} from "../../services";
import { SpinnerCircular } from "spinners-react";

export const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(10);

  const navigate = useNavigate();

  // Used for init load
  const searchParams = new URLSearchParams(window.location.search);
  // Get query string value of the "find" key
  const findQuery = searchParams.get("find");
  // Get query string value of the "price" key
  const priceQuery = searchParams.get("price");
  // Get query string value of the "rating" key
  const ratingQuery = searchParams.get("rating");

  // Indexes to keep track of pagination
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = searchResults.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  // Handle page change
  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  // Dynamic filter handler
  const handleFilter = async (key, value) => {
    const searchParams = new URLSearchParams(window.location.search);
    switch (key) {
      case "price":
        // Run if value is provided
        if (value) {
          // Run if query string is not already in URL
          if (priceQuery) {
            // Set query string value in URL
            searchParams.set(key, value);
          } else {
            // Append query string in URL
            searchParams.append(key, value);
          }
        }
        // Else, run if no value is provided
        else {
          searchParams.delete(key);
        }
        break;

      // Same concept as above
      case "rating":
        if (value) {
          if (ratingQuery) {
            searchParams.set(key, value);
          } else {
            searchParams.append(key, value);
          }
        } else {
          searchParams.delete(key);
        }
        break;
      default:
        break;
    }

    // Navigate to the new search address to trigger useEffect that fetches data
    navigate(`/search?${searchParams}`);
    handleFetchData();
  };

  const handleFetchData = async () => {
    const searchQuery = new URLSearchParams(window.location.search);
    setIsLoading(true);
    // Get query string value of the "find" key
    const findQuery = searchQuery.get("find");
    // Get query string value of the "price" key
    const priceQuery = searchQuery.get("price");
    // Get query string value of the "rating" key
    const ratingQuery = searchQuery.get("rating");

    let results;
    // Fetch filtered results based on what params exist
    if (findQuery && priceQuery && ratingQuery) {
      results = await getPriceAndRatingFilteredResults(
        findQuery,
        searchQuery.get("price"),
        searchQuery.get("rating")
      );
    } else if (findQuery && priceQuery) {
      results = await getPriceFilteredResults(findQuery, priceQuery);
    } else if (findQuery && ratingQuery) {
      results = await getRatingFilteredResults(findQuery, ratingQuery);
    } else {
      results = await getSearchResults(findQuery);
    }

    setSearchResults(results);
    setIsLoading(false);
  };

  // Fetch data whenever search params are updated
  useEffect(() => {
    handleFetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.search]);

  return (
    <div>
      <SearchBar />
      <div className="mt-2">
        <p>Showing results for "{findQuery}"</p>
        <p>
          <em>Results: {searchResults.length}</em>
        </p>
      </div>
      <Filters
        price={priceQuery}
        rating={ratingQuery}
        handleFilter={handleFilter}
      />
      {isLoading ? (
        <div className="mt-5 text-center">
          <SpinnerCircular color="#36ad47" size={80} />
        </div>
      ) : (
        <>
          <Restaurants restaurants={currentRestaurants} />
          <Pagination
            restaurantsPerPage={restaurantsPerPage}
            totalRestaurants={searchResults.length}
            handlePaginate={handlePaginate}
          />
        </>
      )}
    </div>
  );
};
