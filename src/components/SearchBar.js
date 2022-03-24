import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSuggestions, getSearchResults } from "../services";
import { useRestaurants } from "../contexts/RestaurantsContext";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsCopy, setSuggestionsCopy] = useState([]);
  const [cursor, setCursor] = useState(-1);

  const navigate = useNavigate();
  const { setSearchResults } = useRestaurants();

  const handleChange = (e) => {
    if (e.target.value) {
      // If user is typing, filter through suggestions with user input value
      let tempSuggestions = suggestionsCopy.filter((data) => {
        return data.query
          .toLowerCase()
          .startsWith(e.target.value.toLowerCase());
      });

      setSearch(e.target.value);
      setUserSearch(e.target.value); // Temp save user input for setSearchValue()
      setSuggestions(tempSuggestions);
    } else {
      setSearch("");
      setSuggestions([]);
      setCursor(-1);
    }
  };

  // Let user use arrow keys to navigate suggestions
  const handleKeyDown = async (e) => {
    if (e.key === "ArrowUp" && cursor > -1) {
      e.preventDefault(); // Prevent insertion point from moving to the beginning
      setCursor(cursor - 1);
    }
    else if (e.key === "ArrowDown" && cursor < suggestions.length - 1) {
      setCursor(cursor + 1);
    }
    else if (e.key === "Enter") {
      e.preventDefault();
      // Get search value
      const searchValue = document.getElementById("search");
      // Get search results
      const results = await getSearchResults(searchValue.value.toLowerCase());

      setSuggestions([]);
      setSearchResults(results);
      // Navigate to search results page
      navigate(`/search?find=${search}`);
    }
  };

  const setSearchValue = (isHovered, suggestion, index) => {
    // Set value of suggestion in search box when isHovered is true
    if (isHovered) {
      setSearch(suggestion);
      setCursor(index);
    }
    // Set original value in search box that the user was typing when isHovered is false
    else {
      setSearch(userSearch);
      setCursor(-1);
    }
  };

  // Set search box value when using arrow keys
  useEffect(() => {
    const item = document.getElementById(cursor);
    if (item) {
      setSearch(item.textContent);
    }
    else {
      setSearch(userSearch);
    }
  }, [cursor, userSearch]);

  useEffect(() => {
    async function fetchData() {
      const suggestions = await getSuggestions();
      // Set fetched suggestions to a copy so handleChange()
      // won't overwrite the original suggestions array
      setSuggestionsCopy(suggestions);
    }

    fetchData();
  }, []);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        id="search"
        value={search}
        autoComplete="off"
        onChange={(e) => handleChange(e)}
        onKeyDown={handleKeyDown}
        placeholder="Find a place..."
      />
      <ul className={`${suggestions.length && "border-solid-1"}`}>
        {suggestions.map((suggestion, i) => (
          <li
            key={i}
            id={i} // Referred to when setting search input value with arrow keys
            className={`p-1 ${cursor === i && "bg-grey-lighten-3"}`}
            onMouseEnter={() => setSearchValue(true, suggestion.query, i)}
            onMouseLeave={() => setSearchValue(false, suggestion.query, i)}
          >
            {suggestion.query}
          </li>
        ))}
      </ul>
    </div>
  );
};
