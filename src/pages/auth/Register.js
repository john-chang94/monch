import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "../../services";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import * as ROUTES from "../../constants/routes";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const { activeUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Return error is form is incomplete
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return setError("Missing entries");
    }
    // Return error is passwords to not match
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    let user = { firstName, lastName, email };
    await register(user, email, password);

    // Redirect to home after registration
    navigate(ROUTES.HOME);
  };

  useEffect(() => {
    // If a user is signed in, do not show this component
    if (activeUser) navigate(ROUTES.HOME);
  }, [activeUser]);

  return (
    <div>
      <form onSubmit={handleRegister} className="flex flex-col align-center mt-5">
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
        <button
          className="btn-med grey-lighten-4 bg-green-darken-3 my-4"
        >
          Register
        </button>
      </form>
      {error && <p className="red">{error}</p>}
      <div className="text-center">
        <p>Have an account?</p>
        <Link to={ROUTES.SIGN_IN} className="blue-darken-2 no-dec pointer">Sign in here</Link>
      </div>
    </div>
  );
}
