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
  const [userHasReview, setUserHasReview] = useState(false);
  const { restaurantId } = useParams();
  const { user } = useAuth();

  const handleFetchData = async () => {
    const restaurant = await getRestaurant(restaurantId);
    const reviews = await getReviews(restaurantId);

    // Check if signed in user posted a review for the restaurant
    if (user) {
      const hasReview = reviews.filter((review) => {
        return user.userId === review.userId;
      })
      if (hasReview.length) {
        setUserHasReview(true);
      }
    }

    setRestaurant(restaurant);
    setReviews(reviews);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    restaurant && (
      <div>
        <RestaurantDetails restaurant={restaurant} />
        {/* <RestaurantImages /> */}
        <AddReview
          user={user}
          restaurantId={restaurantId}
          userHasReview={userHasReview}
          handleFetchData={handleFetchData}
        />
        <Reviews reviews={reviews} />
      </div>
    )
  );
}
