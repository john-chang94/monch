import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

import * as ROUTES from "../../constants/routes";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { activeUser, setActiveUser } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
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
      setError(err.message);
    }
  };

  useEffect(() => {
    // If a user is signed in, do not show this component
    if (activeUser) navigate(ROUTES.HOME);
  }, [activeUser]);

  return (
    <div>
      <form onSubmit={handleSignIn} className="flex flex-col align-center mt-5">
        <div className="mb-1 w-90">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-1 w-90">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn-med grey-lighten-4 bg-green-darken-3 my-4">Sign In</button>
      </form>
      {error && <p className="red">{error}</p>}
      <div className="text-center">
        <p>No account?</p>
        <Link to={ROUTES.REGISTER} className="blue-darken-2 text-no-u pointer">Sign up here</Link>
      </div>
    </div>
  );
}
