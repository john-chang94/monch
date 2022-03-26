import React, { useState } from "react";
import { PriceFilter } from "./PriceFilter";

export const Filters = ({ price, handlePriceFilter }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <div
        className="w-100 mt-1"
        onClick={() => setShowFilters(!showFilters)}
      >
        <div className="flex align-center justify-between bg-grey-lighten-2 p-1 pointer-no-u">
          <h4 className="grey-darken-4">Filters</h4>
          <i className={`mr-2 fas ${showFilters ? "fa-minus" : "fa-plus"}`} />
        </div>
      </div>
      <div
        className={`border-bottom border-x p-1 ${
          !showFilters && "hide-filters-content"
        }`}
      >
        <p>Price</p>
        <PriceFilter price={price} handlePriceFilter={handlePriceFilter} />

      </div>
    </>
  );
};
