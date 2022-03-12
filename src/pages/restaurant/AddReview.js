import React, { useState, useEffect } from "react";
import { addReview } from "../../services";

export const AddReview = ({ userDocId, restaurantId }) => {
  const [details, setDetails] = useState("");
  const [images, setImages] = useState([]);
  const [stars, setStars] = useState([]);
  const [rating, setRating] = useState("");

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

    setRating((starIndex + 1).toString()); // Rating must be 1-5
    setStars(stars);
  };

  const handleSubmit = async () => {
    const review = { rating, details };
    await addReview(userDocId, restaurantId, review, images);
  };

  useEffect(() => {
    const renderEmptyStars = () => {
      let stars = [];
      for (let i = 0; i < 5; i++) {
        stars.push(
          <i
            className="far fa-star green pointer"
            key={i}
            onClick={() => handleRating(i)}
          />
        );
      }

      setStars(stars);
    };

    renderEmptyStars();
  }, []);

  return (
    <div className="w-100 bg-x-light-gray">
      <div className="p-1">
        <p>Leave a review</p>
        <p>{stars}</p>
        <div className="my-2">
          <label htmlFor="details">Details</label>
          <textarea
            name="details"
            value={details}
            className="add-review-details"
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="images">Add images (optional)</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />
        </div>
        <div>
          <button className="btn-med mt-3 hovered" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
