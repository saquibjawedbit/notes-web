import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Outlet } from 'react-router-dom';

function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    if (user == null) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default ProtectedRoute;