import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSuggestions } from "../contexts/SuggestionsContext";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  // Used to modify suggestions while user is typing without altering original
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [cursor, setCursor] = useState(-1);

  const { suggestions } = useSuggestions();
  const navigate = useNavigate();
  const pathname = window.location.pathname; // Used for styling search input

  // Handle change when user is typing
  const handleChange = (e) => {
    if (e.target.value) {
      // If user is typing, filter through suggestions with user input value
      let currentSuggestions = suggestions.filter((data) => {
        return data.query
          .toLowerCase()
          .startsWith(e.target.value.toLowerCase());
      });

      setSearch(e.target.value);
      setUserSearch(e.target.value); // Temp save user input for setSearchValue()
      setCurrentSuggestions(currentSuggestions);
    } else {
      setSearch("");
      setCurrentSuggestions([]);
      setCursor(-1);
    }
  };

  // Let user use arrow keys to navigate suggestions
  const handleKeyDown = async (e) => {
    if (e.key === "ArrowUp" && cursor > -1) {
      e.preventDefault(); // Prevent insertion point from moving to the beginning
      setCursor(cursor - 1);
    }
    else if (e.key === "ArrowDown" && cursor < currentSuggestions.length - 1) {
      setCursor(cursor + 1);
    }
    else if (e.key === "Enter") {
      e.preventDefault();
      // Get search value
      const searchValue = document.getElementById("search");
      const query = searchValue.value.toLowerCase();

      setCurrentSuggestions([]);
      navigate(`/search?find=${query}`);
    }
  };

  // Handle suggestion search with mouse click
  const handleClick = async (query) => {
    navigate(`/search?find=${query}`);
    setSearch(query);
    setCurrentSuggestions([]);
  }

  // Set search value of suggestion with mouse hover
  const handleSetSearchValue = (isHovered, suggestion, index) => {
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
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor]);

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
        // Add top margin when in Search component vs Home component
        style={pathname === "/search" ? { marginTop: "25px" } : { marginTop: "370px" }}
      />
      <ul className={`${currentSuggestions.length && "border-solid-1"}`}>
        {currentSuggestions.map((suggestion, i) => (
          <li
            key={i}
            id={i} // Referred to when setting search input value with arrow keys
            className={`p-1 ${cursor === i && "bg-grey-lighten-3"} pointer-no-u`}
            onClick={() => handleClick(suggestion.query)}
            onMouseEnter={() => handleSetSearchValue(true, suggestion.query, i)}
            onMouseLeave={() => handleSetSearchValue(false, suggestion.query, i)}
          >
            {suggestion.query}
          </li>
        ))}
      </ul>
    </div>
  );
};
