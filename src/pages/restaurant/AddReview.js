import React, { useState, useEffect } from "react";
import { addReview } from "../../services";

export const AddReview = ({ user, restaurantId }) => {
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

    setRating((starIndex + 1)); // Rating must be 1-5
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
      lastName: user.lastName
    };
    await addReview(review, images);
  };

  useEffect(() => {
    renderEmptyStars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-100 bg-x-light-gray">
      <div className="p-2">
        <p>Leave a review</p>
        <p>{stars}</p>
        <div className="my-1">
          <label htmlFor="details">Details</label>
          <textarea
            name="details"
            value={details}
            className="add-review-details"
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <div>
          <p>Add images (optional)</p>
          <input
            type="file"
            name="images"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />
        </div>
        <div>
          <button
            className="btn-med mt-4 bg-teal-lighten-2 pointer-no-u"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
