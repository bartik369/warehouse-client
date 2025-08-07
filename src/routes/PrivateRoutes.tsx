import Loader from '@/components/ui/loader/Loader';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { RootState } from '@/store/store';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const location = useLocation();
    const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);
    const isAuthChecked = useAppSelector((state: RootState) => state.auth.isAuthChecked);

    const hasAccessToken = localStorage.getItem('hasAccessToken') === 'true';

    if (!hasAccessToken) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (!isAuthChecked) {
        return <Loader size='lg' color='blue' />
    }
    if (isAuth) {
        return <Outlet />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;
