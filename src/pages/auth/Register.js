import React, { useState } from "react";
import { register } from "../../services";
import { useNavigate } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

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
  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={firstName}
          className=""
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={lastName}
          className=""
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          className=""
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          className=""
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          value={confirmPassword}
          className=""
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
      {error && <p className="red">{error}</p>}
    </div>
  );
}
