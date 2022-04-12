import React, { useState, useEffect, useMemo } from "react";
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
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
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

    switch (key) {
      case "price":
        // Run if value is provided
        if (value)
        {
          // Run if query string is not already in URL
          if (priceQuery)
          {
            // Set query string value in URL
            searchParams.set(key, value);
            // Get filtered search results
            results = await getPriceFilteredResults(findQuery, value);
            // Else, run if query string is already in URL
          }
          else
          {
            // Append query string in URL
            searchParams.append(key, value);
            // Get filtered search results
            results = await getPriceFilteredResults(findQuery, value);
          }
          // If all filters are applied after setting/appending, get all filtered results
          if (searchParams.has("price") && searchParams.has("rating"))
          {
            handleAllFilters();
          }
        }
        // Else, run if no value is provided
        else
        {
          searchParams.delete(key);
          // If other query strings still exist after deletion, get other filtered results
          if (searchParams.has("rating"))
          {
            results = await getRatingFilteredResults(
              findQuery,
              searchParams.get("rating")
            );
          }
          // If other query strings do not exist after deletion, get all search results
          else
          {
            results = await getSearchResults(findQuery);
          }
        }
        break;

      // Same concept as above
      case "rating":
        if (value)
        {
          if (ratingQuery)
          {
            searchParams.set(key, value);
            results = await getRatingFilteredResults(findQuery, value);
          }
          else
          {
            searchParams.append(key, value);
            results = await getRatingFilteredResults(findQuery, value);
          }

          if (searchParams.has("price") && searchParams.has("rating")) {
            handleAllFilters();
          }
        }
        else
        {
          searchParams.delete(key);
          if (searchParams.has("price"))
          {
            results = await getPriceFilteredResults(
              findQuery,
              searchParams.get("price")
            );
          }
          else
          {
            results = await getSearchResults(findQuery);
          }
        }
        break;
      default:
        break;
    }

    setSearchResults(results);
    setIsLoading(false);
    navigate(`/search?${searchParams}`);
  };

  const handleAllFilters = async () => {
      const results = await getPriceAndRatingFilteredResults(
        findQuery,
        searchParams.get("price"),
        searchParams.get("rating")
      );

      setSearchResults(results);
      setIsLoading(false);
      navigate(`/search?${searchParams}`);
  }

  useEffect(() => {
    async function fetchData() {
      // Remove filter on page load
      searchParams.delete("price");
      searchParams.delete("rating");
      navigate(`/search?${searchParams}`);

      // Get search results with no filter
      const results = await getSearchResults(findQuery);
      setSearchResults(results);
      setIsLoading(false);
    }

    fetchData();
    // Refetch when user changes search value from this component
  }, [findQuery]);

  useEffect(() => {
    searchParams.forEach((value, key) => {
      console.log(value, key);
    })
  }, [searchParams])

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
