import React from "react";

export const Pagination = ({ restaurantsPerPage, totalRestaurants, handlePaginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination flex justify-center">
        {pageNumbers.map((number, i) => (
          <li
            key={i}
            onClick={() => handlePaginate(number)}
            className="p-2 pointer border-solid-1"
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};
