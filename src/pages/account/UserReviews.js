import React, { useState, useEffect } from 'react';
import { Reviews } from '../../components/Reviews';
import { getReviewsByUser } from '../../services';
import { useParams } from 'react-router-dom';

import { SpinnerCircular } from "spinners-react";

export const UserReviews = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [reviews, setReviews] = useState([]);

    const { userId } = useParams();

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            const reviews = await getReviewsByUser(userId);
            setReviews(reviews);
            setIsLoading(false);
        }

        fetchData();
    }, [])

    return (
        <div>
            {isLoading ? (
                <div className="mt-3 text-center">
                    <SpinnerCircular color="#36ad47" size={80} />
              </div>
            ) : (
                <div>
                    <Reviews reviews={reviews} />
                </div>
            )}
        </div>
    )
}