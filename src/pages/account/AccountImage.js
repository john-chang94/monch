import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

export const AccountImage = () => {
  const [image, setImage] = useState([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex flex-col align-center mt-3">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/monch-63774.appspot.com/o/images%2Fusers%2Fperson-blank.png?alt=media&token=844dd72d-aa88-4f08-863d-aaf03bb1dfab"
          alt="user profile"
          className="account-img"
        />
        <button
          className="btn-med mt-3 pointer-no-u hovered"
          onClick={() => setShowModal(true)}
        >
          Upload...
        </button>
      </div>
      <CSSTransition
        in={showModal}
        timeout={300}
        classNames="modal-fade"
        unmountOnExit
      >
        <div>
          <div
            className="modal-container"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="modal">
            <div className="p-2">
              <p>User's image</p>
            </div>
            <div className="p-2">
              <p>Upload image</p>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
