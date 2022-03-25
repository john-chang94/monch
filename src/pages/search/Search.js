import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Restaurants } from "../../components/Restaurants";
import { SearchBar } from "../../components/SearchBar";

import { getSearchResults } from "../../services";
import { SpinnerCircular } from "spinners-react";

export const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Used to search for query strings
  const location = useLocation();
  // Get query string value of the "find" key
  const query = new URLSearchParams(location.search).get("find");

  useEffect(() => {
    async function fetchData() {
      const results = await getSearchResults(query);
      setSearchResults(results);
      setIsLoading(false);
    }

    fetchData();
    // Refetch when user changes search value from this component
  }, [query]);

  return (
    <div>
      {isLoading ? (
        <div className="mt-5 text-center">
          <SpinnerCircular color="#36ad47" size={80} />
        </div>
      ) : (
        <>
          <SearchBar />
          <div className="mt-2">
              <p>Showing results for "{query}"</p>
          </div>
          <Restaurants restaurants={searchResults} />
        </>
      )}
    </div>
  );
};
