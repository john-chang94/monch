import React, { useState, useEffect } from "react";

export const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="search-bar">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/monch-63774.appspot.com/o/images%2Freviews%2Ffood-4773380_1920.jpg?alt=media&token=a2dbf087-aee5-41df-908b-cbccc07e2c4d"
        alt="food cover for homepage"
      />
      <p>Discover your favorite eatery</p>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-input"
        placeholder="Find a place..."
      />
    </div>
  );
};
