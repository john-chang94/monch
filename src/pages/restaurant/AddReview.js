import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addReview } from "../../services";

import * as ROUTES from "../../constants/routes";

export const AddReview = ({
  user,
  restaurantId,
  userHasReview,
  handleFetchData,
}) => {
  const [details, setDetails] = useState("");
  const [images, setImages] = useState([]);
  const [stars, setStars] = useState([]);
  const [rating, setRating] = useState("");

  // Fills in stars based on what user clicks
  const handleRating = (starIndex) => {
    // Font Awesome & Materialize classes for filled and empty stars
    const filled = "fas fa-star green pointer";
    const empty = "far fa-star green pointer";
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

  // Run on init component load
  const renderEmptyStars = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          className="far fa-star green pointer-no-u"
          key={i}
          onClick={() => handleRating(i)}
        />
      );
    }

    setStars(stars);
  };

  const handleSubmit = async () => {
    const review = {
      rating,
      details,
      restaurantId,
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    // Add empty images array to body if no images
    if (!images.length) {
      review.images = [];
    }

    await addReview(review, images);
    handleFetchData();
    setDetails("");
    setRating("");
    setImages([]);
    renderEmptyStars();
  };

  useEffect(() => {
    renderEmptyStars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-100 bg-grey-lighten-3">
      {user ? (
        <div className="p-2">
          {userHasReview ? (
            <>
              <p>
                You already posted a review.
                <br />
                <Link to={`/account/${user.userId}`} className="text-no-u blue-darken-2">
                  Manage your reviews here
                </Link>
              </p>
            </>
          ) : (
            <>
              <p>Leave a review</p>
              <p>{stars}</p>
            </>
          )}
          <div className="my-1">
            <label htmlFor="details">Details</label>
            <textarea
              name="details"
              value={details}
              className="add-review-details"
              onChange={(e) => setDetails(e.target.value)}
              disabled={userHasReview}
            />
          </div>
          <div>
            <p>Add images (optional)</p>
            <input
              type="file"
              name="images"
              multiple
              onChange={(e) => setImages(e.target.files)}
              disabled={userHasReview}
            />
          </div>
          {!userHasReview && (
            <div>
              <button
                className="btn-med mt-4 grey-lighten-4 pointer-no-u"
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="py-5">
          <Link to={ROUTES.SIGN_IN} className="text-no-u blue-darken-2">
            Sign in
          </Link>{" "}
          to leave a review
        </p>
      )}
    </div>
  );
};
