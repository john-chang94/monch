import React from 'react'
import { renderStars } from '../helpers/renderStars'

export const Reviews = ({ reviews }) => (
    <div className="reviews">
        {reviews && reviews.map((review, i) => (
            <div key={i} className="review p-2 my-2 bg-grey-lighten-3">
                <p>{renderStars(review.rating)}</p>
                <p>{review.details}</p>
                <br />
                {review.images && review.images.map((image, image_i) => (
                    <div key={image_i}>
                        <img src={image} alt="user review" className="user-review-img" />
                    </div>
                ))}
                <p>Reviewer: {review.firstName} {review.lastName}</p>
                <p>Date: {new Date(review.date).toLocaleDateString()}</p>
            </div>
        ))}
    </div>
)
