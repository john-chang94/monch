import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { register } from "../../services";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import * as ROUTES from "../../constants/routes";
import { Toast } from "../../components/Toast";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isError, setIsError] = useState(false);
  const timeout = useRef(null); // For toast timeout ref

  const { activeUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Return error is form is incomplete
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      handleSetToast(true, "Missing data");
      return;
    }
    // Return error if email is invalid
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
      handleSetToast(true, "Invalid email");
      return;
    }
    // Return error is passwords to not match
    if (password !== confirmPassword) {
      handleSetToast(true, "Passwords do not match");
      return;
    }

    let user = { firstName, lastName, email };
    await register(user, email, password);

    // Redirect to home after registration
    navigate(ROUTES.HOME);
  };

  // Set toast data and toggle
  const handleSetToast = (isError, text) => {
    setIsError(isError);
    setToast(text);
    setShowToast(true);
    timeout.current = setTimeout(
      () => {
        setShowToast(false);
        // Render toast for 5 secs if error, otherwise 3 secs
      },
      isError ? 5000 : 3000
    );
  };

  useEffect(() => {
    // If a user is signed in, do not show this component
    if (activeUser) navigate(ROUTES.HOME);
  }, [activeUser]);

  // Clear timeout for toast if user navigates away before it ends
  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  return (
    <div>
      <Toast toast={toast} showToast={showToast} isError={isError} />
      <form
        onSubmit={handleRegister}
        className="flex flex-col align-center mt-5"
      >
        <div className="flex flex-col mb-1 w-80">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            className="form-input"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-1 w-80">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            className="form-input"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-1 w-80">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-1 w-80">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-1 w-80">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            className="form-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="btn-med grey-lighten-4 bg-green-darken-3 my-4 pointer">
          Register
        </button>
      </form>
      <div className="text-center">
        <p>Have an account?</p>
        <Link to={ROUTES.SIGN_IN} className="blue-darken-2 no-dec pointer">
          Sign in here
        </Link>
      </div>
    </div>
  );
};
