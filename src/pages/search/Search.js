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
  const findQuery = searchParams.get("find");
  const priceQuery = searchParams.get("price");
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
          if (priceQuery) {
            // Set query string value in URL
            searchParams.set(key, value);
          } else {
            // Append query string in URL
            searchParams.append(key, value);
          }
        }
        // Remove query string if no value is provided
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

    // Navigate to the new search address to trigger re-fetch
    navigate(`/search?${searchParams}`);
    handleQuerySearch();
  };

  const handleQuerySearch = async () => {
    setIsLoading(true);
    // Get query strings
    const searchParams = new URLSearchParams(window.location.search);
    const findQuery = searchParams.get("find");
    const priceQuery = searchParams.get("price");
    const ratingQuery = searchParams.get("rating");

    let results;
    // Fetch filtered results based on what params exist
    if (findQuery && priceQuery && ratingQuery) {
      results = await getPriceAndRatingFilteredResults(
        findQuery,
        priceQuery,
        ratingQuery
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
    handleQuerySearch();
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
