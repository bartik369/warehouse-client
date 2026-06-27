import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@/hooks/redux/useRedux';
import Loader from '@/shared/ui/loader/Loader';
import { RootState } from '@/store/store';

const PrivateRoutes = () => {
  const location = useLocation();
  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);
  const isAuthChecked = useAppSelector((state: RootState) => state.auth.isAuthChecked);

  const hasAccessToken = localStorage.getItem('hasAccessToken') === 'true';

  if (!hasAccessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!isAuthChecked) {
    return <Loader size="lg" color="blue" />;
  }
  if (isAuth) {
    return <Outlet />;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;
