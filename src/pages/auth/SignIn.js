import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

import * as ROUTES from "../../constants/routes";
import { Toast } from "../../components/Toast";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isError, setIsError] = useState(false);
  const timeout = useRef(null); // For toast timeout ref

  const { activeUser, setActiveUser } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      handleSetToast(true, "Missing credentials");
      return;
    }
    try {
      const signedInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Set firebase auth user in context
      setActiveUser(signedInUser.user);
      // Redirect to home after sign in
      navigate(ROUTES.HOME);
    } catch (err) {
      handleSetToast(true, err.message);
    }
  };

  // Set toast data and toggle
  const handleSetToast = (isError, text) => {
    setIsError(isError);
    setToast(text);
    setShowToast(true);
    timeout.current = setTimeout(
      () => {
        setShowToast(false);
        // Display toast for 5 secs if error, otherwise 3 secs
      },
      isError ? 5000 : 3000
    );
  };

  useEffect(() => {
    // If a user is signed in, do not show this component
    if (activeUser) navigate(ROUTES.HOME);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser]);

  // Clear timeout for toast if user navigates away before it ends
  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  return (
    <div>
      <Toast toast={toast} showToast={showToast} isError={isError} />
      <form onSubmit={handleSignIn} className="flex flex-col align-center mt-5">
        <div className="mb-1 w-80">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-1 w-80">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn-med grey-lighten-4 bg-green-darken-3 my-4 pointer">
          Sign In
        </button>
      </form>
      <div className="text-center">
        <p>No account?</p>
        <Link to={ROUTES.REGISTER} className="blue-darken-2 no-dec pointer">
          Sign up here
        </Link>
      </div>
    </div>
  );
};
