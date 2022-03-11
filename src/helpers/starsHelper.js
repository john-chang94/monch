export const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            // Add a whole star
            // Key is required because stars gets rendered as an array in components
            stars.push(<i className="fas fa-star yellow-text text-darken-2" key={i}></i>)
            // Add a half star if rating is a decimal and is equal to current loop index
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<i className="fas fa-star-half-alt yellow-text text-darken-2" key={i}></i>)
        } else {
            // Add an empty star
            stars.push(<i className="far fa-star yellow-text text-darken-2" key={i}></i>)
        }
    }
    return stars;
}