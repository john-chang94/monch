import React, { useState, useEffect } from "react";
import { Reviews } from "../../components/Reviews";
import { getReviewsByUser } from "../../services";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import { SpinnerCircular } from "spinners-react";
import { useAuth } from "../../contexts/AuthContext";

export const UserReviews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const { userId } = useParams();
  const { activeUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeUser) {
      navigate(ROUTES.HOME);
      return;
    }

    async function fetchData() {
      setIsLoading(true);
      const reviews = await getReviewsByUser(userId);
      setReviews(reviews);
      setIsLoading(false);
    }

    fetchData();
  }, [activeUser]);

  return (
    <div>
      {isLoading ? (
        <div className="mt-3 text-center">
          <SpinnerCircular color="#36ad47" size={80} />
        </div>
      ) : (
        <div>
          <Link to={`/account/${userId}`} className="no-dec pointer black">
            <i className="fas fa-arrow-left mt-2 mb-1" /> Account
          </Link>
          <Reviews reviews={reviews} isUser={true} />
        </div>
      )}
    </div>
  );
};
