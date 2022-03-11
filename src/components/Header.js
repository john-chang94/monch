import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import { useAuth } from "../contexts/AuthContext";
import { getUserById } from "../services";

import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState(null);
  const { activeUser } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth);
    navigate(ROUTES.HOME);
  };

  useEffect(() => {
    if (activeUser) {
      const handleFetchUser = async () => {
        const user = await getUserById(activeUser.uid);
        setUser(user);
      };

      handleFetchUser();
    }
  }, [activeUser]);

  return (
    <header className="off-white flex justify-between align-center">
      <Link to={ROUTES.HOME} className="off-white text-no-u text-7 ml-2">
        Monch!
      </Link>
      <div>
        {user ? (
          <div className="flex">
            <p>Hi, {user.firstName}</p>
            <p className="pointer-no-u mx-2" onClick={handleSignOut}>
              Sign Out
            </p>
          </div>
        ) : (
          // Hide links if user is on either sign in or register page
          window.location.pathname !== "/signin" &&
          window.location.pathname !== "/register" && (
            <div>
              <Link to={ROUTES.SIGN_IN} className="off-white text-no-u pointer">
                Sign In
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="off-white text-no-u pointer mx-2"
              >
                Register
              </Link>
            </div>
          )
        )}
      </div>
    </header>
  );
}
