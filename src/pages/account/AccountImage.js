import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { getUserById, updateUserImage } from "../../services";

export const AccountImage = ({ user, setUser }) => {
  const [showModal, setShowModal] = useState(true);

  const handleUpdatePhoto = async (e) => {
    await updateUserImage(user.docId, e.target.files[0]);
    const updated = await getUserById(user.userId);
    setUser(updated);
    setShowModal(false);
  }

  return (
    <div>
      <div className="flex flex-col align-center mt-3">
        <img
          src={user.profileImg}
          alt="user profile"
          className="account-img"
        />
        <button
          className="btn-med mt-3 pointer-no-u hovered"
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
      >
        <div>
          <div
            className="modal-container"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="modal">
            <div className="p-2">
            <img
                src={user.profileImg}
                alt="user profile"
                className="account-img"
            />
            </div>
            <div className="p-2">
              <input type="file" onChange={handleUpdatePhoto} />
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
