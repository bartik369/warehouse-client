import { useAppSelector } from "../hooks/redux/useRedux";
import { Outlet, useLocation, Navigate } from 'react-router-dom';

const PublicRoutes = () => {
    const location = useLocation();
    const token = localStorage.getItem('accessToken');

    return (
        <>
        {token
        ? <Navigate to="/" state={{ from: location }} replace />
        : <Outlet />
        }
        </>
    )
}

export default PublicRoutes