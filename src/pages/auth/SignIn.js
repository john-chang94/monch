import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

import * as ROUTES from "../../constants/routes";

export default function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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
      setActiveUser(signedInUser.user);
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
      <form onSubmit={handleSignIn}>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button>Sign In</button>
      </form>
      {error && <p className="red">{error}</p>}
    </div>
  );
}
