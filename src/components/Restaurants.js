import React from "react";
import { Link } from "react-router-dom";
import { renderStars, capitalizeFirstLetter } from "../helpers";

export const Restaurants = ({ restaurants }) => {
  return (
    <div>
      {restaurants.length ? (
        restaurants.map(
          ({ docId, name, categories, rating, totalRatings, price }, i) => (
            <Link to={`/restaurants/${docId}`} key={i} className="black no-dec">
              <div className="card my-3">
                <div className="px-2 py-4">
                  <h3>
                    <strong>{capitalizeFirstLetter(name)}</strong>
                  </h3>
                  <p>
                    {categories.map((category, i) => (
                      <span
                        key={i}
                        // Add spacing for categories except the first one
                        className={`text-3 border-smooth bg-grey-lighten-3 ${
                          i !== 0 && "ml-1"
                        }`}
                        style={{ padding: "1px 3px" }}
                      >
                        {category}
                      </span>
                    ))}
                  </p>
                  <p>
                    {renderStars(rating)}
                    {` (${totalRatings} ${
                      totalRatings === 1 ? "review" : "reviews"
                    })`}
                  </p>
                  <p>Price: {"$".repeat(parseInt(price))}</p>
                </div>
              </div>
            </Link>
          )
        )
      ) : (
        <p className="text-center mt-5">No results</p>
      )}
    </div>
  );
};
