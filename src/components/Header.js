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
    <header className="flex justify-between align-center grey-lighten-4 bg-green-darken-3">
      <Link to={ROUTES.HOME} className="grey-lighten-4 text-no-u text-7">
        Monch!
      </Link>
      <div>
        {user ? (
          <div className="flex">
            <p className="mr-5">Hi, {user.firstName}</p>
            <p className="pointer-no-u" onClick={handleSignOut}>
              Sign Out
            </p>
          </div>
        ) : (
          <div>
            <Link to={ROUTES.SIGN_IN} className="grey-lighten-4 text-no-u pointer-no-u mr-5">
              Sign In
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="grey-lighten-4 text-no-u pointer-no-u"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
