import { renderStars } from "../helpers/starsHelper";

export const RestaurantCard = ({
  name,
  categories,
  rating,
  totalRatings,
  price,
}) => (
  <div className="card m-2">
    <div className="px-2 py-5">
      <p>{name}</p>
      <em>
        {categories.map((category, i) => (
          <span key={i}>
            {
              // No comma after the last category
              i === categories.length - 1 ? category : `${category}, `
            }
          </span>
        ))}
      </em>
      <p>
        {renderStars(rating)} ({totalRatings} reviews)
      </p>
      <p>{"$".repeat(parseInt(price))}</p>
    </div>
  </div>
);
