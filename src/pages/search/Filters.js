import React, { useState } from "react";
import { PriceFilter } from "./PriceFilter";
import { RatingFilter } from "./RatingFilter";

export const Filters = ({ price, rating, handleFilter }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <div className="w-100 mt-1" onClick={() => setShowFilters(!showFilters)}>
        <div className="flex align-center justify-between bg-grey-lighten-2 p-1 pointer-no-dec">
          <h4 className="grey-darken-4">Filters</h4>
          <i className={`mr-2 fas ${showFilters ? "fa-minus" : "fa-plus"}`} />
        </div>
      </div>
      <div
        className={`border-bottom border-x p-1 ${
          !showFilters && "hide-filters-content"
        }`}
      >
        <div className="flex">
          <div>
            <p>Price</p>
            <PriceFilter price={price} handleFilter={handleFilter} />
          </div>
          <div className="ml-3">
            <p>Rating</p>
            <RatingFilter rating={rating} handleFilter={handleFilter} />
          </div>
        </div>
      </div>
    </>
  );
};
