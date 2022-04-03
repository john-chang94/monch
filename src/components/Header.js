import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import { useAuth } from "../contexts/AuthContext";

import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { getUserById } from "../services";

export const Header = () => {
  const [user, setUser] = useState(null);
  const { activeUser, setActiveUser } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth);
    setActiveUser(null);
    navigate(ROUTES.HOME);
  };

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserById(activeUser.uid);
      setUser(user);
    }

    fetchUser();
  }, [])

  return (
    <header className="flex justify-between align-center grey-lighten-4 bg-green-darken-3">
      <Link to={ROUTES.HOME} className="grey-lighten-4 no-dec text-8">
        Monch!
      </Link>
      <div>
        {user ? (
          <div className="flex align-center">
            <Link
              to={`/account/${user.userId}`}
              className="mr-4 grey-lighten-4 no-dec border-round border-solid-1"
            >
              <p className="header-initials">
                {user.firstName[0]}
                {user.lastName[0]}
              </p>
            </Link>
            <div>
              <p className="pointer-no-dec" onClick={handleSignOut}>
                Sign Out
              </p>
            </div>
          </div>
        ) : (
          <div>
            <Link
              to={ROUTES.SIGN_IN}
              className="grey-lighten-4 no-dec pointer-no-dec mr-5"
            >
              Sign In
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="grey-lighten-4 no-dec pointer-no-dec"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
