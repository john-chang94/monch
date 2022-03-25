import React from "react";
import { renderStars, capitalizeFirstLetter } from "../../helpers";

export const RestaurantDetails = ({ restaurant }) => (
  <>
    <h3>{capitalizeFirstLetter(restaurant.name)}</h3>
    <p className="text-3">
      {restaurant.categories.map((category, i) => (
        <em key={i}>
          {
            // No comma after the last category
            i === restaurant.categories.length - 1 ? category : `${category}, `
          }
        </em>
      ))}
    </p>
    <p>
      {renderStars(restaurant.rating)}
      {` (${restaurant.totalRatings} ${restaurant.totalRatings === 1 ? "review" : "reviews"})`}
    </p>
    <p>Price: {"$".repeat(parseInt(restaurant.price))}</p>
  </>
);
