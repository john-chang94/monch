import React from "react";
import { Link } from "react-router-dom";

import { RestaurantCard } from "./RestaurantCard";

export const Restaurants = ({ restaurants }) => {
  return (
    <div>
      {restaurants.length ?
        restaurants.map(
          ({ docId, name, categories, rating, totalRatings, price }, i) => (
            <Link to={`/restaurants/${docId}`} key={i} className="black no-dec">
              <RestaurantCard
                name={name}
                categories={categories}
                rating={rating}
                totalRatings={totalRatings}
                price={price}
              />
            </Link>
          )
        ) : (
          <p className="text-center mt-5">No results</p>
        )}
    </div>
  );
}
