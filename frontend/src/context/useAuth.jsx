import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    // Login function
    const checkAuth = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/me`);
            const user = response.data.data;
            setUser(user);
            setLoading(false);

        } catch (error) {
            if (error.response.data.message === 'jwt expired') {
                try {
                    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/refresh-token`);
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/me`);
                    const user = response.data.data;
                    setUser(user);
                } catch (error) {
                    
                }
            }
            setLoading(false);
        }
    };

    useEffect(()=> {
        checkAuth();
    }, []);

    // Update logout function
    const logout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/logout`);
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear the user state even if server logout fails
            setUser(null);
        }
    };

    // Context value to share
    const value = {
        user,
        setUser,
        logout,
        isAuthenticated: !!user,
        loading,
        admin: (user != null) ? (user.role == "admin") : false
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the Auth Context
export const useAuth = () => useContext(AuthContext);
