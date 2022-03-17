import React from "react";
import ImageGallery from "react-image-gallery";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

export const RestaurantImages = ({ reviewImages }) => {
  return (
    <div className="flex flex-center">
      {reviewImages.length > 0 ? (
        <ImageGallery
          items={reviewImages}
          showPlayButton={false}
          additionalClass="img-gallery"
        />
      ) : (
        <p>No images yet</p>
      )}
    </div>
  );
};
