import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import * as ROUTES from "../constants/routes";

import { useAuth } from "../contexts/AuthContext";
import { getUserById } from "../services";

import { auth } from "../config/firebase";
import { signOut } from 'firebase/auth';

export default function Header() {
  const [user, setUser] = useState(null);
  const { activeUser } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth);
    navigate(ROUTES.HOME);
}

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
    <header className="off-white flex">
      <p className="text-7">Monch!</p>
      <div>
        {activeUser && user ? (
            <div>
                <p>Hi, {user.firstName}</p>
                <p className="pointer-no-u" onClick={handleSignOut}>Sign Out</p>
          </div>
        ) : (
          <div>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            <Link to={ROUTES.REGISTER}>Register</Link>
          </div>
        )}
      </div>
    </header>
  );
}
