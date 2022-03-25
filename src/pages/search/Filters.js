import React from "react";

export const Filters = ({ price, handleFilterPrice }) => {
  return (
    <div>
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
            className="filled-in"
          />
          <span>$</span>
        </p>
        <p>
          <input
            type="checkbox"
            name="group1"
            checked={price === "2"}
            onChange={() =>
              price !== "2" ? handleFilterPrice("2") : handleFilterPrice("")
            }
            className="filled-in"
          />
          <span>$$</span>
        </p>
        <p>
          <input
            type="checkbox"
            name="group1"
            checked={price === "3"}
            onChange={() =>
              price !== "3" ? handleFilterPrice("3") : handleFilterPrice("")
            }
            className="filled-in"
          />
          <span>$$$</span>
        </p>
        <p>
          <input
            type="checkbox"
            name="group1"
            checked={price === "4"}
            onChange={() =>
              price !== "4" ? handleFilterPrice("4") : handleFilterPrice("")
            }
            className="filled-in"
          />
          <span>$$$$</span>
        </p>
      </div>
    </div>
  );
};
