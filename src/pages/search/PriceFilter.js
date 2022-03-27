import React from "react";

export const PriceFilter = ({ price, handleFilter }) => (
  <>
    <p>
      <input
        type="checkbox"
        name="priceFilter"
        checked={price === "1"}
        onChange={() =>
          price !== "1" ? handleFilter("price", "1") : handleFilter("price", "")
        }
      />
      <span> $</span>
    </p>
    <p>
      <input
        type="checkbox"
        name="priceFilter"
        checked={price === "2"}
        onChange={() =>
          price !== "2" ? handleFilter("price", "2") : handleFilter("price", "")
        }
      />
      <span> $$</span>
    </p>
    <p>
      <input
        type="checkbox"
        name="priceFilter"
        checked={price === "3"}
        onChange={() =>
          price !== "3" ? handleFilter("price", "3") : handleFilter("price", "")
        }
      />
      <span> $$$</span>
    </p>
    <p>
      <input
        type="checkbox"
        name="priceFilter"
        checked={price === "4"}
        onChange={() =>
          price !== "4" ? handleFilter("price", "4") : handleFilter("price", "")
        }
      />
      <span> $$$$</span>
    </p>
  </>
);
