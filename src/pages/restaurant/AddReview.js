import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addReview } from "../../services";

import { SpinnerCircular } from "spinners-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Run on init component load
  const renderEmptyStars = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          className="far fa-star yellow-darken-2 pointer-no-dec"
          key={i}
          onClick={() => handleRating(i)}
        />
      );
    }

    setStars(stars);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const review = {
      rating,
      details,
      restaurantId,
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      date: Date.now()
    };
    
    await addReview(review, images);

    // Add a delay before refetching data so firebase can finish uploading images
    setTimeout(() => {
      handleFetchData();
      setDetails("");
      setRating("");
      setImages([]);
      renderEmptyStars();
      setIsSubmitting(false);
    }, images.length*1000); // Add delay for every image that is uploaded
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
                <Link to={`/account/${user.userId}/reviews`} className="no-dec blue-darken-2">
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
          {isSubmitting ? (
            <div className="my-3">
              <SpinnerCircular
                color="#36ad47"
              />
            </div>
          ) : (
            <div>
            <button
                className={`btn-med mt-3 ${!userHasReview && "grey-lighten-4 bg-green-darken-3 pointer-no-dec"}`}
                onClick={handleSubmit}
                disabled={userHasReview}
              >
                SUBMIT
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="py-5 ml-2">
          <Link to={ROUTES.SIGN_IN} className="no-dec blue-darken-2">
            Sign in
          </Link>{" "}
          to leave a review
        </p>
      )}
    </div>
  );
};
