import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

export default function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
      e.preventDefault();
      const res = await signIn(email, password);

      // If sign in error, display message
      if (res.error) setError(res.error);
      else navigate(ROUTES.HOME);
  }

  
  useEffect(() => {
      // If a user is signed in, do not show this component
      if (user) navigate(ROUTES.HOME);
  }, [])

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
