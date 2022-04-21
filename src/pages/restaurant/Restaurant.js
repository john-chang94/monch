import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  getRestaurant,
  getReviews,
  getRestaurantReviewImages,
  getUserById,
} from "../../services";

import { RestaurantDetails } from "./RestaurantDetails";
import { RestaurantImages } from "./RestaurantImages";
import { AddReview } from "./AddReview";
import { Reviews } from "../../components/Reviews";

import { SpinnerCircular } from "spinners-react";

export const Restaurant = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewImages, setReviewImages] = useState([]);
  const [user, setUser] = useState(null);
  const [userHasReview, setUserHasReview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { restaurantId } = useParams();
  const { activeUser } = useAuth();

  const handleFetchData = async () => {
    const restaurant = await getRestaurant(restaurantId);
    const reviews = await getReviews(restaurantId);
    const reviewImages = await getRestaurantReviewImages(restaurantId);
    
    // Check if a user is signed in
    if (activeUser) {
      const user = await getUserById(activeUser.uid);
      setUser(user);
      // Check if user posted a review for current restaurant
      // Checked with uid, not user's doc id
      const hasReview = reviews.filter((review) => {
        return user.userId === review.userId;
      });
      // Disable review form if user already posted a review
      if (hasReview.length) {
        setUserHasReview(true);
      }
    }

    // Render restaurant review images, if any
    if (reviewImages) {
      let images = [];
      for (let i = 0; i < reviewImages.length; i++) {
        images.push({
          original: reviewImages[i].url,
          thumbnail: reviewImages[i].url,
        });
      }
      setReviewImages(images);
    }

    setRestaurant(restaurant);
    setReviews(reviews);
    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return isLoading ? (
    <div className="mt-5 text-center">
      <SpinnerCircular color="#36ad47" size={80} />
    </div>
  ) : (
    <div>
      <RestaurantDetails restaurant={restaurant} />
      <hr className="my-4" />
      <RestaurantImages reviewImages={reviewImages} />
      <hr className="my-4" />
      <AddReview
        user={user}
        restaurantId={restaurantId}
        userHasReview={userHasReview}
        handleFetchData={handleFetchData}
      />
      <hr className="my-4" />
      <Reviews reviews={reviews} isUser={false} />
    </div>
  );
}
