import React, { createContext, useState, useEffect, useContext } from "react";
import { getSuggestions } from "../services";

const SuggestionsContext = createContext();

export const useSuggestions = () => useContext(SuggestionsContext); // Custom hook

export const SuggestionsContextProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState(null); // Initial state for all suggestions
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        const suggestions = await getSuggestions();
        setSuggestions(suggestions);
        setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <SuggestionsContext.Provider value={{ suggestions }}>
      {!isLoading && children}
    </SuggestionsContext.Provider>
  );
};
