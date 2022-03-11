import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // Custom hook

export const AuthContextProvider = ({ children }) => {
    const [activeUser, setActiveUser] = useState(null); // Firebase auth user object, not user doc
    const [isLoading, setIsLoading] = useState(true);

    // Listen to active user auth state
    useEffect(() => {
        onAuthStateChanged(auth, (activeUser) => {
            if (activeUser) {
                setActiveUser(activeUser);
                setIsLoading(false);
            } else {
                setActiveUser(null);
                setIsLoading(false);
            }
        })
    }, [activeUser])

    return (
        <AuthContext.Provider value={{ activeUser, setActiveUser }}>
            {!isLoading && children}    
        </AuthContext.Provider>
    )
}