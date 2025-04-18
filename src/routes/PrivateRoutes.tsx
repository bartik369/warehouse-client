import { Outlet, useLocation, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const location = useLocation();
    const token = localStorage.getItem('accessToken');

    return token
    ? <Outlet /> 
    : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;