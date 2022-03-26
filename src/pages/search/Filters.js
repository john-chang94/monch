import React, { useState } from "react";

export const Filters = ({ price, handleFilterPrice }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <div
        className="filters w-100 mt-1"
        onClick={() => setShowFilters(!showFilters)}
      >
        <div className="flex align-center justify-between bg-light-green-lighten-3 p-1 pointer-no-u">
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
        <div>
          <p>
            <input
              type="checkbox"
              name="group1"
              checked={price === "1"}
              onChange={() =>
                price !== "1" ? handleFilterPrice("1") : handleFilterPrice("")
              }
            />
            <span> $</span>
          </p>
          <p>
            <input
              type="checkbox"
              name="group1"
              checked={price === "2"}
              onChange={() =>
                price !== "2" ? handleFilterPrice("2") : handleFilterPrice("")
              }
            />
            <span> $$</span>
          </p>
          <p>
            <input
              type="checkbox"
              name="group1"
              checked={price === "3"}
              onChange={() =>
                price !== "3" ? handleFilterPrice("3") : handleFilterPrice("")
              }
            />
            <span> $$$</span>
          </p>
          <p>
            <input
              type="checkbox"
              name="group1"
              checked={price === "4"}
              onChange={() =>
                price !== "4" ? handleFilterPrice("4") : handleFilterPrice("")
              }
            />
            <span> $$$$</span>
          </p>
        </div>
      </div>
    </>
  );
};
