import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoutes = () => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');

  return <>{token ? <Navigate to="/home" state={{ from: location }} replace /> : <Outlet />}</>;
};

export default PublicRoutes;
