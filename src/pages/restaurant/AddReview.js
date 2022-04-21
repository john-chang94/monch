import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { addReview } from "../../services";

import { SpinnerCircular } from "spinners-react";

import * as ROUTES from "../../constants/routes";
import { Toast } from "../../components/Toast";

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
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isError, setIsError] = useState(false);
  const timeout = useRef(null); // For toast timeout ref

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
    // Check for missing data in review
    if (!rating || !details) {
      handleSetToast(true, "Missing data");
      return;
    }
    // Check if review images reached limit
    if (images.length > 6) {
      handleSetToast(true, "Limit of 6 images per review");
      return;
    }

    setIsSubmitting(true);
    const review = {
      rating,
      details,
      restaurantId,
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      date: Date.now(),
    };

    await addReview(review, images);

    // Add a delay before refetching data so firebase can finish uploading images
    setTimeout(() => {
      // Re-fetch restaurant after submitting review
      handleFetchData();
      // Clear review form
      setDetails("");
      setRating("");
      setImages([]);
      renderEmptyStars();
      setIsSubmitting(false);
    }, images.length * 1000); // Add delay for every image that is uploaded
  };

  // Set toast data and toggle
  const handleSetToast = (isError, text) => {
    setIsError(isError);
    setToast(text);
    setShowToast(true);
    timeout.current = setTimeout(
      () => {
        setShowToast(false);
        // Render toast for 5 secs if error, otherwise 3 secs
      },
      isError ? 5000 : 3000
    );
  };

  useEffect(() => {
    renderEmptyStars();

    // // Clear timeout for toast if user navigates away before it ends
    return () => clearTimeout(timeout.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-100 bg-grey-lighten-3">
      <Toast toast={toast} showToast={showToast} isError={isError} />
      {user ? (
        <div className="p-2">
          {userHasReview ? (
            <>
              <p>
                You already posted a review.
                <br />
                <Link
                  to={`/account/${user.userId}/reviews`}
                  className="no-dec blue-darken-2"
                >
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
              <SpinnerCircular color="#36ad47" />
            </div>
          ) : (
            <div>
              <button
                className={`btn-med mt-3 ${
                  !userHasReview &&
                  "grey-lighten-4 bg-green-darken-3 pointer-no-dec"
                }`}
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
