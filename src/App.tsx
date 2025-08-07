import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useValidateMutation } from './store/api/authApi';
import { useAppDispatch} from './hooks/redux/useRedux';
import { setCredentials, setAuth } from './store/slices/authSlice';
import PrivateRoutes from './routes/PrivateRoutes';
import Layout from './routes/Layout';
import PublicRoutes from './routes/PublicRoutes';
import privateRoutes from './config/routes/privateRoutes';
import publicRoutes from './config/routes/publicRoutes';
import { handleApiError } from './utils/errors/handleApiError';
import Page404 from './components/pages/404/page404';
import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const [validToken] = useValidateMutation();

  useEffect(() => {
    const hasAccessToken = localStorage.getItem('hasAccessToken');
    if (!hasAccessToken) {
      dispatch(setAuth(false));
      return;
    }
    (async function () {
      try {
        const data = await validToken(null).unwrap();
        if (data) {
          localStorage.setItem('hasAccessToken', 'true')
          dispatch(setCredentials(data));
        }
      } catch (err) {
        dispatch(setAuth(false));
        handleApiError(err);
      }
    })();
  }, []);
  
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Layout />}>
          {privateRoutes.flatMap(({ path, element }) =>
            (Array.isArray(path) ? path : [path]).map((p) => (
              <Route key={p} path={p} element={element} />
            ))
          )}
        </Route>
      </Route>
      <Route element={<PublicRoutes />}>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App
