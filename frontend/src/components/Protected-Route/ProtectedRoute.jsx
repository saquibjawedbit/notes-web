import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.jsx';
import { Outlet } from 'react-router-dom';
import ReactLoading from 'react-loading';

function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className='flex items-center justify-center h-[600px]'>
            <ReactLoading type={'cubes'} color={'#000000'} height={'8%'} width={'8%'} />
        </div>
    }

    if (user == null) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default ProtectedRoute;