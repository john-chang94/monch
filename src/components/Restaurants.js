import React from "react";
import { Link } from "react-router-dom";

import { RestaurantCard } from "./RestaurantCard";

export default function Restaurants({ restaurants }) {
  return (
    <div>
      {restaurants &&
        restaurants.map(
          ({ docId, name, categories, rating, totalRatings, price }, i) => (
            <Link to={`/restaurants/${docId}`} key={i} className="black text-no-u">
              <RestaurantCard
                name={name}
                categories={categories}
                rating={rating}
                totalRatings={totalRatings}
                price={price}
              />
            </Link>
          )
        )}
    </div>
  );
}
