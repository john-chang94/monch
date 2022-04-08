import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  addReviewImage,
  deleteReviewImage,
  getReviewById,
} from "../../services";

import { SpinnerCircular } from "spinners-react";

export const EditReview = () => {
  const [review, setReview] = useState(null);
  const [details, setDetails] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [stars, setStars] = useState([]);
  const [imageIndex, setImageIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const { userId, reviewId } = useParams();

  // Fills in stars based on what user clicks
  const handleRating = (starIndex) => {
    // Font Awesome for filled and empty stars
    const filled = "fas fa-star yellow-darken-2 pointer-no-dec";
    const empty = "far fa-star yellow-darken-2 pointer-no-dec";
    let stars = [];

    for (let i = 0; i < 5; i++) {
      // If the selected star index is >= current loop index,
      // add a filled star, otherwise add an empty star
      stars.push(
        <i
          className={starIndex >= i ? filled : empty}
          key={i}
          onClick={() => handleRating(i)}
        />
      );
    }

    setRating(starIndex + 1); // Rating must be 1-5
    setStars(stars);
  };

  const handleAddImage = async (image) => {
    setIsUpdating(true);
    await addReviewImage(reviewId, review.restaurantId, image);
    const updated = await getReviewById(reviewId);

    setReview(updated);
    setIsHovered(false);
    setImageIndex(null);
    setIsUpdating(false);
  };

  const handleDeleteImage = async (image) => {
    setIsUpdating(true);
    const doDelete = window.confirm("Delete image from review?");
    if (doDelete) {
      await deleteReviewImage(reviewId, image);
      const updated = await getReviewById(reviewId);

      setReview(updated);
      setIsUpdating(false);
    } else {
      setIsHovered(false);
      setImageIndex(null);
      setIsUpdating(false);
    }
  };

  // Handle css change when user hovers mouse over image to delete
  const handleIsHovered = (imageIndex, isHovered) => {
    setIsHovered(isHovered);
    setImageIndex(imageIndex);
  };

  const renderInitialStars = (rating) => {
    const filled = "fas fa-star yellow-darken-2 pointer-no-dec";
    const empty = "far fa-star yellow-darken-2 pointer-no-dec";
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          // Render initial rating using state from location
          className={rating >= i ? filled : empty}
          key={i}
          onClick={() => handleRating(i)}
        />
      );
    }

    setStars(stars);
  };

  useEffect(() => {
    async function fetchData() {
      const review = await getReviewById(reviewId);
      setReview(review);
      setDetails(review.details);
      setRating(review.rating);
      renderInitialStars(review.rating);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return isLoading ? (
    <div className="my-1 text-center">
      <SpinnerCircular color="#36ad47" size={80} />
    </div>
  ) : (
    <div>
      <div className="my-2">
        <Link
          to={`/account/${userId}/reviews`}
          className="no-dec pointer black"
        >
          <i className="fas fa-arrow-left" /> Back
        </Link>
      </div>
      <p className="my-1">{stars}</p>
      <div>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={5}
          className="my-1"
        />
      </div>
      <div>
        <button className="btn-sm grey-lighten-4 bg-green-darken-3">SAVE</button>
      </div>
      <hr className="my-2" />
      <div>
        {isUpdating ? (
          <div className="my-1 text-center">
            <SpinnerCircular color="#36ad47" />
          </div>
        ) : (
          <>
            <div className="grid">
              {review?.images &&
                review?.images.map((image, image_i) => (
                  <div
                    key={image_i}
                    className="relative xs12 s6 m4 l2"
                    onMouseOver={() => handleIsHovered(image_i, true)}
                    onMouseOut={() => handleIsHovered(image_i, false)}
                    onClick={() => handleDeleteImage(image)}
                  >
                    <p
                      className={`${
                        isHovered && image_i === imageIndex
                          ? "delete-img"
                          : "hide"
                      }`}
                    >
                      <i className="fas fa-times" />
                    </p>
                    <img
                      src={image}
                      alt="user review"
                      className={`w-100 ${
                        isHovered && image_i === imageIndex && "fade-half"
                      }`}
                    />
                  </div>
                ))}
            </div>
            <hr className="my-2" />
            <div>
              <p>Add images (optional)</p>
              <input
                type="file"
                name="images"
                onChange={(e) => handleAddImage(e.target.files[0])}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
