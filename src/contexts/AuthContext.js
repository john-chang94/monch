import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserById } from "../services";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // Custom hook

export const AuthContextProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null); // Firebase auth user object
  const [user, setUser] = useState(null); // Firestore user doc
  const [isLoading, setIsLoading] = useState(true);

  // Listen to active user auth state
  useEffect(() => {
    onAuthStateChanged(auth, (activeUser) => {
      if (activeUser) {
        // Get firestore user doc
        getUserById(activeUser.uid).then((user) => {
          setUser(user);
          setActiveUser(activeUser);
          setIsLoading(false);
        });
      } else {
        setActiveUser(null);
        setIsLoading(false);
      }
    });
  }, [activeUser]);

  return (
    <AuthContext.Provider value={{ activeUser, user, setActiveUser, setUser }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
