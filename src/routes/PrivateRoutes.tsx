import {useState, useEffect} from 'react';
import { useAppSelector } from '../hooks/redux/useRedux';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Loader from '../components/ui/loader/Loader';

const PrivateRoutes = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const token = localStorage.getItem("accessToken");
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (token && user) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [token, user]);

    if (isLoading) {
        return <Loader size='lg' color='grey'/>; // Или спиннер вместо `null`
    }

    return isAuthenticated 
    ? <Outlet /> 
    : <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoutes;