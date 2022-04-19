import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { deleteUserImage, getUserById, updateUserImage } from "../../services";

import { SpinnerCircular } from "spinners-react";

export const AccountImage = ({ user, setUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef();

  const handleUpdateImage = async (e) => {
    setIsLoading(true);
    await updateUserImage(user.docId, e.target.files[0]);
    const updated = await getUserById(user.userId);
    setUser(updated);
    setIsLoading(false);
    setShowModal(false);
  };

  const handleDeleteImage = async () => {
    const doDelete = window.confirm("Delete photo?");

    if (doDelete) {
      setIsLoading(true);
      await deleteUserImage(user.docId);
      const updated = await getUserById(user.userId);
      setUser(updated);
      setIsLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col align-center mt-3">
        <img src={user.profileImg} alt="user profile" className="account-img" />
        <button
          className="btn-med mt-3 pointer-no-dec hovered"
          onClick={() => setShowModal(true)}
        >
          Edit
        </button>
      </div>
      <CSSTransition
        in={showModal}
        timeout={300}
        classNames="modal-fade"
        unmountOnExit
        nodeRef={modalRef}
      >
        <div ref={modalRef}>
          <div
            className="modal-container"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="modal">
            <div onClick={() => setShowModal(false)}>
              <i className="fas fa-times" />
            </div>
            <div className="p-2">
              <img src={user.profileImg} alt="user profile" />
            </div>
            {isLoading ? (
              <div className="mt-3 text-center">
                <SpinnerCircular color="#36ad47" size={80} />
              </div>
            ) : (
              <>
                <div className="p-2">
                  <p className="mb-1">Upload a new photo</p>
                  <input type="file" onChange={handleUpdateImage} />
                </div>
                {!user.profileImgDefault && (
                  <div className="pt-2">
                    <button
                      className="btn-med btn-hovered white bg-red-darken-3"
                      onClick={handleDeleteImage}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
