import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getRestaurant, getReviews } from "../../services";

import { RestaurantDetails } from "./RestaurantDetails";
import { RestaurantImages } from "./RestaurantImages";
import { AddReview } from "./AddReview";
import { Reviews } from "../../components/Reviews";

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { restaurantId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const handleFetchData = async () => {
      const restaurant = await getRestaurant(restaurantId);
      const reviews = await getReviews(restaurantId);
      setRestaurant(restaurant);
      setReviews(reviews);
    };

    handleFetchData();
  }, [restaurantId]);

  return (
    restaurant && (
      <div>
        <RestaurantDetails restaurant={restaurant} />
        {/* <RestaurantImages /> */}
        <AddReview user={user} restaurantId={restaurantId} />
        <Reviews
          reviews={reviews}
        />
      </div>
    )
  );
}
