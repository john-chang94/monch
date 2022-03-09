import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // Custom hook

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Sign in with firebase email and password
    const signIn = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            setUser(res.user);
        } catch (err) {
            return { error: err.message };
        }
    } 

    // Listen to user auth state
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsLoading(false);
            } else {
                setUser(null);
                setIsLoading(false);
            }
        })
    }, [user])

    return (
        <AuthContext.Provider value={{ user, signIn }}>
            {!isLoading && children}    
        </AuthContext.Provider>
    )
}