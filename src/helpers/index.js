export const renderStars = (rating) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // Add a whole star
      // Key is required because stars gets rendered as an array in components
      stars.push(<i className="fas fa-star yellow-darken-2" key={i} />);
      // Add a half star if rating is a decimal and is equal to current loop index
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <i className="fas fa-star-half-alt yellow-darken-2" key={i} />
      );
    } else {
      // Add an empty star
      stars.push(<i className="far fa-star yellow-darken-2" key={i} />);
    }
  }

  return stars;
};

export const capitalizeFirstLetter = (string) => {
  let formatted;
  let split = string.split(" ");
  if (split.length > 1) {
    for (let i = 0; i < split.length; i++) {
      split[i] = split[i][0].toUpperCase() + split[i].substring(1);
    }
    formatted = split.join(" ");
  } else {
    formatted = string.substring(0, 1).toUpperCase() + string.substring(1);
  }

  return formatted;
};
