import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
                try {
                    // Replace with your axios endpoint
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

        checkAuth();
    }, []);



    return { user, loading };
};