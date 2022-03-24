import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

import { AccountImage } from "./AccountImage";
import { AccountSettings } from "./AccountSettings";
import { SpinnerCircular } from "spinners-react";

export const Account = () => {
  const { user, setUser } = useAuth();

  return user ? (
    <div>
        {/* <AccountImage /> */}
        <AccountSettings user={user} setUser={setUser} />
    </div>
  ) : (
    <div className="mt-5 text-center">
      <SpinnerCircular color="#36ad47" size={80} />
    </div>
  );
}
