import { renderStars } from "../helpers";

export const RestaurantCard = ({
  name,
  categories,
  rating,
  totalRatings,
  price,
}) => (
  <div className="card my-3">
    <div className="px-2 py-4">
      <h3>
        <strong>{name}</strong>
      </h3>
      <p>
        {categories.map((category, i) => (
          <span
            key={i}
            // Add spacing for categories except the first one
            className={`text-3 border-smooth bg-grey-lighten-3 ${
              i !== 0 && "ml-1"
            }`}
            style={{ padding: "1px 3px" }}
          >
            {category}
          </span>
        ))}
      </p>
      <p>
        {renderStars(rating)}
        {` (${totalRatings} ${totalRatings === 1 ? "review" : "reviews"})`}
      </p>
      <p>{"$".repeat(parseInt(price))}</p>
    </div>
  </div>
);
