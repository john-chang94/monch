import React from "react";
import { renderStars } from "../../helpers/index";

export const RatingFilter = ({ rating, handleFilter }) => (
  <>
    <p>
      <input
        type="checkbox"
        name="ratingFilter"
        checked={rating === "1.01"}
        onChange={() =>
          rating !== "1.01" ? handleFilter("rating", "1.01") : handleFilter("rating", "")
        }
      />
      <span> {renderStars(1)}</span>
    </p>
    <p>
      <input
        type="checkbox"
        name="ratingFilter"
        checked={rating === "2.01"}
        onChange={() =>
          rating !== "2.01" ? handleFilter("rating", "2.01") : handleFilter("rating", "")
        }
      />
      <span> {renderStars(2)}</span>
    </p>
    <p>
      <input
        type="checkbox"
        name="ratingFilter"
        checked={rating === "3.01"}
        onChange={() =>
          rating !== "3.01" ? handleFilter("rating", "3.01") : handleFilter("rating", "")
        }
      />
      <span> {renderStars(3)}</span>
    </p>
    <p>
      <input
        type="checkbox"
        name="ratingFilter"
        checked={rating === "4.01"}
        onChange={() =>
          rating !== "4.01" ? handleFilter("rating", "4.01") : handleFilter("rating", "")
        }
      />
      <span> {renderStars(4)}</span>
    </p>
    <p>
      <input
        type="checkbox"
        name="ratingFilter"
        checked={rating === "5.01"}
        onChange={() =>
          rating !== "5.01" ? handleFilter("rating", "5") : handleFilter("rating", "")
        }
      />
      <span> {renderStars(5)}</span>
    </p>
  </>
);
