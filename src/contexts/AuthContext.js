import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import * as ROUTES from "../constants/routes";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // Custom hook

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    // Sign in with firebase email and password
    const signIn = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            setUser(res.user);
            console.log(res.user);
        } catch (err) {
            console.log(err.message);
        }
    } 

    // Listen to user auth state
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoading(false);
                navigate(ROUTES.ACCOUNT);
            } else {
                setIsLoading(false);
                navigate(ROUTES.HOME);
            }
        })
    }, [user, navigate])

    return (
        <AuthContext.Provider value={{ user, signIn }}>
            {!isLoading && children}    
        </AuthContext.Provider>
    )
}