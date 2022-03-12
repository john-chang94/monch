import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import { useAuth } from "../contexts/AuthContext";

import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export default function Header() {
  const { user, setUser, setActiveUser } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth);
    setUser(null);
    setActiveUser(null);
    navigate(ROUTES.HOME);
  };

  return (
    <header className="off-white flex justify-between align-center">
      <Link to={ROUTES.HOME} className="off-white text-no-u text-7 ml-2">
        Monch!
      </Link>
      <div>
        {user ? (
          <div className="flex">
            <p className="mr-2">Hi, {user.firstName}</p>
            <p className="pointer-no-u mx-2" onClick={handleSignOut}>
              Sign Out
            </p>
          </div>
        ) : (
          <div>
            <Link to={ROUTES.SIGN_IN} className="off-white text-no-u pointer mr-2">
              Sign In
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="off-white text-no-u pointer mx-2"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
