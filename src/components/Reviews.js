import React from 'react'
import { renderStars } from '../helpers/renderStars'

export const Reviews = ({ reviews }) => (
    <div>
        {reviews && reviews.map((review, i) => (
            <div key={i}>
                <p>{renderStars(review.rating)}</p>
                <p>{review.details}</p>
                <br />
                <p>Reviewer: {review.firstName} {review.lastName}</p>
            </div>
        ))}
    </div>
)
