import React, { useState } from "react";
import { getUserById, updateUser } from "../../services";
import { Link } from "react-router-dom";

export const AccountSettings = ({ user, setUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showAccount, setShowAccount] = useState(true);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showEditAccount, setShowEditAccount] = useState(false);
  const [error, setError] = useState("");

  const handleTabClick = (tab) => {
    if (tab === "account") {
      setShowAccount(true);
      setShowSecurity(false);
    }
    if (tab === "security") {
      setShowSecurity(true);
      setShowAccount(false);
      setShowEditAccount(false);
    }
  };

  const handleShowEditAccount = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setShowEditAccount(true);
  };

  const handleCancelEditAccount = () => {
    setError("");
    setShowEditAccount(false);
  }

  const handleUpdateAccount = async () => {
    // Check if any inputs are empty
    if (!firstName || !lastName || !email) {
      setError("Missing data");
      return;
    }
    // Check if email is valid
    if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email))) {
      setError("Invalid email");
      return;
    }

    const body = { firstName, lastName, email, userId: user.userId };
    await updateUser(user.docId, body);

    // Fetch updated user info after updating
    const updatedUser = await getUserById(user.userId);
    setUser(updatedUser);
    setShowEditAccount(false);
    setError("");
  };

  const handleUpdatePassword = async () => {}

  const renderAccount = () => (
    <>
      <div className="my-2">
        <p>
          <strong>First Name</strong>
        </p>
        <p>{user.firstName}</p>
      </div>
      <div className="my-2">
        <p>
          <strong>Last Name</strong>
        </p>
        <p>{user.lastName}</p>
      </div>
      <div className="my-2">
        <p>
          <strong>Email Address</strong>
        </p>
        <p>{user.email}</p>
      </div>
      <div className="mt-5">
        <button
          className="btn-med grey-lighten-4 bg-green-darken-3 pointer-no-dec"
          onClick={handleShowEditAccount}
        >
          EDIT
        </button>
      </div>
      <div className="mt-3">
        <Link to={`/account/${user.userId}/reviews`} className="no-dec blue-darken-2">
          Manage reviews
        </Link>
      </div>
    </>
  );

  const renderSecurity = () => (
    <>
      <div>
        <p>
          <strong>Edit Password</strong>
        </p>
      </div>
      <div className="my-2">
        <p>Current Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="my-2">
        <p>New Password</p>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="my-2">
        <p>Confirm New Password</p>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="mt-5">
        <button
        onClick={handleUpdatePassword}
          className="btn-med grey-lighten-4 bg-green-darken-3 pointer-no-dec">
          Update
        </button>
      </div>
    </>
  );

  const renderEditAccount = () => (
    <>
      <div className="my-2">
        <p>First Name</p>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="my-2">
        <p>Last Name</p>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="my-2">
        <p>Email Address</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
      </div>
      {error && <p className="my-2 red">{error}</p>}
      <button
        onClick={handleUpdateAccount}
        className="btn-med grey-lighten-4 bg-green-darken-3 pointer-no-dec mt-2"
      >
        Save
      </button>
      <button
        onClick={handleCancelEditAccount}
        className="btn-med pointer-no-dec ml-5"
      >
        Cancel
      </button>
    </>
  );

  return (
    <div>
      <div className="account-tabs">
        <div
          className="w-100 border-solid-1 py-2 pointer-no-dec hovered"
          onClick={() => handleTabClick("account")}
        >
          <p>Account</p>
        </div>
        <div
          className="w-100 border-solid-1 py-2 pointer-no-dec hovered"
          onClick={() => handleTabClick("security")}
        >
          <p>Security</p>
        </div>
      </div>
      {
        // Display account tab or security tab
        showAccount &&
          // Display account details or edit account details
          (showEditAccount ? renderEditAccount() : renderAccount())
      }
      {showSecurity && renderSecurity()}
    </div>
  );
};
