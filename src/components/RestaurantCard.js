import { renderStars } from "../helpers/renderStars";

export const RestaurantCard = ({
  name,
  categories,
  rating,
  totalRatings,
  price,
}) => (
  <div className="card my-3">
    <div className="px-2 py-4">
      <h3><strong>{name}</strong></h3>
      <p>
        {categories.map((category, i) => (
          <span
            key={i}
            // Add spacing for categories except the first one
            className={`text-3 border-smooth bg-x-light-gray ${i !== 0 && "ml-1"}`}
            style={{ padding: '1px 3px' }}
          >
            {category}
          </span>
        ))}
      </p>
      <p>
        {renderStars(rating)} ({totalRatings} reviews)
      </p>
      <p>{"$".repeat(parseInt(price))}</p>
    </div>
  </div>
);
