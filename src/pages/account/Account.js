import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import { AccountImage } from "./AccountImage";
import { AccountSettings } from "./AccountSettings";
import { SpinnerCircular } from "spinners-react";
import { getUserById } from "../../services";

export const Account = () => {
  const [user, setUser] = useState(null);
  const { activeUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeUser) {
      navigate(ROUTES.HOME);
      return;
    }

    async function fetchUser() {
      const user = await getUserById(activeUser.uid);
      setUser(user);
    }

    fetchUser();
  }, [activeUser])

  return user ? (
    <div className="grid">
      <div className="m12 l4">
        <AccountImage user={user} setUser={setUser} />
      </div>
      <div className="m12 l8">
        <AccountSettings user={user} setUser={setUser} />
      </div>
    </div>
  ) : (
    <div className="mt-5 text-center">
      <SpinnerCircular color="#36ad47" size={80} />
    </div>
  );
}
