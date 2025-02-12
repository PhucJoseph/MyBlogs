import React, { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../../firebase/firebase";
import {onAuthStateChanged} from "firebase/auth"

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsbscribe = onAuthStateChanged(auth, initializeUser);
        return unsbscribe
    })

    async function initializeUser(user) {
        if(user) {
            setCurrentUser({...user})
            setUserLoggedIn(true)
        }
        else {
            setCurrentUser(null)
            setUserLoggedIn(false)
        }
        setLoading(false)
    }

    const value = {
        loading,
        userLoggedIn,
        currentUser
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}