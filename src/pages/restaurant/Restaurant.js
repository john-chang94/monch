import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurant } from "../../services";

import { renderStars } from "../../helpers/starsHelper";

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState(null);
  const { restaurantId } = useParams();

  useEffect(() => {
    const handleFetchData = async () => {
      const restaurant = await getRestaurant(restaurantId);
      setRestaurant(restaurant);
    };

    handleFetchData();
  }, []);

  return (
    restaurant && (
      <div>
        <h3>{restaurant.name}</h3>
        <p className="text-3">
          {restaurant.categories.map((category, i) => (
            <em key={i}>
              {
                // No comma after the last category
                i === restaurant.categories.length - 1
                  ? category
                  : `${category}, `
              }
            </em>
          ))}
        </p>
        <p>
          {renderStars(restaurant.rating)} ({restaurant.totalRatings} reviews)
        </p>
        <p>{"$".repeat(parseInt(restaurant.price))}</p>
      </div>
    )
  );
}
