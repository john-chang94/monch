import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import { useAuth } from "../contexts/AuthContext";

import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export const Header = () => {
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
      <Link to={ROUTES.HOME} className="grey-lighten-4 text-no-u text-8">
        Monch!
      </Link>
      <div>
        {user ? (
          <div className="flex align-center">
            <Link
              to={`/account/${user.userId}`}
              className="mr-4 grey-lighten-4 text-no-u border-round border-solid-1"
            >
              <p className="header-initials">
                {user.firstName[0]}
                {user.lastName[0]}
              </p>
            </Link>
            <div>
              <p className="pointer-no-u" onClick={handleSignOut}>
                Sign Out
              </p>
            </div>
          </div>
        ) : (
          <div>
            <Link
              to={ROUTES.SIGN_IN}
              className="grey-lighten-4 text-no-u pointer-no-u mr-5"
            >
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
