import React from 'react';
import { useAppSelector } from '../hooks/redux/useRedux';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const location = useLocation();
    const token = localStorage.getItem('accessToken');
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div>
         {token
            ? <Outlet />
            : <Navigate to="/signin" state={{ from: location }} replace />
         }   
        </div>
    );
};

export default PrivateRoutes;