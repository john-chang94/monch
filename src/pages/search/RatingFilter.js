import React from "react";
import { renderStars } from "../../helpers/index";

export const RatingFilter = ({ rating, handleRatingFilter }) => (
  <>
    <p>
      <input
        type="checkbox"
        name="ratingFilter"
        checked={rating === "1"}
        onChange={() =>
          rating !== "1" ? handleRatingFilter("1") : handleRatingFilter("")
        }
      />
      <span> {renderStars(1)}</span>
    </p>
    <p>
      <input
        type="checkbox"
        name="ratingFilter"
        checked={rating === "2"}
        onChange={() =>
          rating !== "2" ? handleRatingFilter("2") : handleRatingFilter("")
        }
      />
      <span> $$</span>
    </p>
    <p>
      <input
        type="checkbox"
        name="ratingFilter"
        checked={rating === "3"}
        onChange={() =>
          rating !== "3" ? handleRatingFilter("3") : handleRatingFilter("")
        }
      />
      <span> $$$</span>
    </p>
    <p>
      <input
        type="checkbox"
        name="ratingFilter"
        checked={rating === "4"}
        onChange={() =>
          rating !== "4" ? handleRatingFilter("4") : handleRatingFilter("")
        }
      />
      <span> $$$$</span>
    </p>
    <p>
      <input
        type="checkbox"
        name="ratingFilter"
        checked={rating === "5"}
        onChange={() =>
          rating !== "5" ? handleRatingFilter("5") : handleRatingFilter("")
        }
      />
      <span> $$$$</span>
    </p>
  </>
);
