import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  // Used to search for query strings
  const location = useLocation();
  // Get query string object instance
  const searchParams = new URLSearchParams(location.search);
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
    setIsLoading(true);
    let results;

    if (priceQuery && ratingQuery) {
      //
    }

    switch (key) {
      case "price":
        // Run if value is provided
        if (value) {

          // Run if query string is not already in URL
          if (priceQuery) {
            // Get filtered search results
            results = await getPriceFilteredResults(findQuery, value);
            // Set key query string value in URL
            searchParams.set(key, value);

            // Else, run if query string is already in URL
          } else {
            // Get filtered search results
            results = await getPriceFilteredResults(findQuery, value);
            // Append key query string in URL
            searchParams.append(key, value);
          }
        }

        // Else, run if no value is provided
        else {
          // Get search results with no filter
          results = await getSearchResults(findQuery);
          // Remove key query string from URL if no key filter selected
          searchParams.delete(key);
        }
        break;

      case "rating":
        if (value) {
          if (ratingQuery) {
            results = await getRatingFilteredResults(findQuery, value);
            searchParams.set(key, value);
          } else {
            results = await getRatingFilteredResults(findQuery, value);
            searchParams.append(key, value);
          }
        }
        else {
          results = await getSearchResults(findQuery);
          searchParams.delete(key);
        }
        break;
      default:
        break;
    }

    searchParams.forEach(() => {
      if (searchParams.has("price") && searchParams.has("rating")) {
        handleAllFilters();
        return;
      }
    });

    setSearchResults(results);
    setIsLoading(false);
    navigate(`/search?${searchParams}`);
  };

  const handleAllFilters = async () => {
      const results = await getPriceAndRatingFilteredResults(findQuery, priceQuery, ratingQuery);

      setSearchResults(results);
      setIsLoading(false);
      navigate(`/search?${searchParams}`);

      return;
  }

  useEffect(() => {
    async function fetchData() {
      // Remove filter on page load
      searchParams.delete("price");
      searchParams.delete("rating");
      navigate(`/search?${searchParams}`);

      // Get search results with no filter
      const results = await getSearchResults(findQuery);
      // const results = await getRatingFilteredResults(findQuery, 4.14);
      setSearchResults(results);
      setIsLoading(false);
    }

    fetchData();
    // Refetch when user changes search value from this component
  }, [findQuery]);

  return (
    <div>
      <SearchBar />
      <div className="mt-2">
        <p>Showing results for "{findQuery}"</p>
        <p>
          <em>Results: {searchResults.length}</em>
        </p>
      </div>
      <Filters price={priceQuery} rating={ratingQuery} handleFilter={handleFilter} />
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
