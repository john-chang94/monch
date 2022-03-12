import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getRestaurant } from "../../services";

import { RestaurantDetails } from "./RestaurantDetails";
import { RestaurantImages } from "./RestaurantImages";
import { AddReview } from "./AddReview";

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState(null);
  const { restaurantId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const handleFetchData = async () => {
      const restaurant = await getRestaurant(restaurantId);
      setRestaurant(restaurant);
    };

    handleFetchData();
  }, [restaurantId]);

  return restaurant && (
      <div>
          <RestaurantDetails restaurant={restaurant} />
          {/* <RestaurantImages /> */}
          <AddReview userDocId={user.userId} restaurantId={restaurantId} />
      </div>
  )
}
