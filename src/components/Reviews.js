import React from "react";
import { renderStars } from "../helpers";
import { Link } from "react-router-dom";

export const Reviews = ({ reviews, isUser }) => (
  <div className="reviews">
    {reviews.length > 0 ? (
      reviews.map((review, i) => (
        <div key={i} className="review p-2 my-2 bg-grey-lighten-3">
          <p>{renderStars(review.rating)}</p>
          <p>{review.details}</p>
          <br />
          <div className="flex">
            {review.images &&
              review.images.map((image, image_i) => (
                <div key={image_i}>
                  <img
                    src={image}
                    alt="user review"
                    className="user-review-img"
                  />
                </div>
              ))}
          </div>
          {!isUser && ( // Hide reviewer name if location is user account
            <p>
              Reviewer: {review.firstName} {review.lastName}
            </p>
          )}
          <p>Date: {new Date(review.date).toLocaleDateString()}</p>
          {isUser && ( // Display edit button if location is user account
            <Link
              to={`/account/${review.userId}/reviews/${review.docId}`}
              state={review}
              className="no-dec"
            >
              <button className="btn-sm grey-lighten-4 bg-green-darken-3 mt-1 pointer-no-dec">
                EDIT
              </button>
            </Link>
          )}
        </div>
      ))
    ) : (
      <p className="text-center mt-5">No reviews yet</p>
    )}
  </div>
);
