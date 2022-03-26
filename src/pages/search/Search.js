import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { SearchBar } from "../../components/SearchBar";
import { Restaurants } from "../../components/Restaurants";
import { Pagination } from "../../components/Pagination";
import { Filters } from "./Filters";

import { getSearchResults, getFilteredSearchResults } from "../../services";
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

  // Indexes to keep track of pagination
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = searchResults.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  // Handle page change
  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle price filter change
  const handleFilterPrice = async (price) => {
    setIsLoading(true);
    // Run if price param is provided
    if (price) {
      if (priceQuery) {
        // Get filtered search results
        const filteredSearchResults = await getFilteredSearchResults(
          findQuery,
          price
        );
        setSearchResults(filteredSearchResults);
        setIsLoading(false);

        // Set "price" query string if already in URL
        searchParams.set("price", price);
        navigate(`/search?${searchParams}`);
      } else {
        // Get filtered search results
        const filteredSearchResults = await getFilteredSearchResults(
          findQuery,
          price
        );
        setSearchResults(filteredSearchResults);
        setIsLoading(false);

        // Add "price" query string if not already in URL
        searchParams.append("price", price);
        navigate(`/search?${searchParams}`);
      }
    }
    // Else run if no price param provided
    else {
      // Get search results with no filter
      const results = await getSearchResults(findQuery);
      setSearchResults(results);
      setIsLoading(false);

      // Remove "price" query string from URL if no price filter selected
      searchParams.delete("price");
      navigate(`/search?${searchParams}`);
    }
  };

  useEffect(() => {
    async function fetchData() {
      // Remove filter on page load
      if (searchParams.has("price")) {
        searchParams.delete("price");
        navigate(`/search?${searchParams}`);
      }
      // Get search results with no filter
      const results = await getSearchResults(findQuery);
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
      <Filters price={priceQuery} handleFilterPrice={handleFilterPrice} />
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
