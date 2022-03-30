import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

import { AccountImage } from "./AccountImage";
import { AccountSettings } from "./AccountSettings";
import { SpinnerCircular } from "spinners-react";
import { getUserById } from "../../services";

export const Account = () => {
  const [user, setUser] = useState(null);
  const { activeUser } = useAuth();

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserById(activeUser.uid);
      setUser(user);
    }

    fetchUser();
  }, [])

  return user ? (
    <div>
        <AccountImage user={user} setUser={setUser} />
        <AccountSettings user={user} setUser={setUser} />
    </div>
  ) : (
    <div className="mt-5 text-center">
      <SpinnerCircular color="#36ad47" size={80} />
    </div>
  );
}
