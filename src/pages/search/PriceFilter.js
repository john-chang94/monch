import React from "react";

export const PriceFilter = ({ price, handlePriceFilter }) => (
  <>
    <p>
      <input
        type="checkbox"
        name="priceFilter"
        checked={price === "1"}
        onChange={() =>
          price !== "1" ? handlePriceFilter("1") : handlePriceFilter("")
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
          price !== "2" ? handlePriceFilter("2") : handlePriceFilter("")
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
          price !== "3" ? handlePriceFilter("3") : handlePriceFilter("")
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
          price !== "4" ? handlePriceFilter("4") : handlePriceFilter("")
        }
      />
      <span> $$$$</span>
    </p>
  </>
);
