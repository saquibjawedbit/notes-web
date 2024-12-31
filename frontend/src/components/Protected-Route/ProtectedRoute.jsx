import React from 'react';
import { Navigate, replace } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.jsx';
import { Outlet } from 'react-router-dom';
import ReactLoading from 'react-loading';

function ProtectedRoute() {
    const { user, loading, verified } = useAuth();

    if (loading) {
        return <div className='flex items-center justify-center h-[600px]'>
            <ReactLoading type={'cubes'} color={'#000000'} height={'8%'} width={'8%'} />
        </div>
    }

    if (user == null || verified == false) {
        return <Navigate to="/login"  replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;