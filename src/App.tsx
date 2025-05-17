import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useValidateMutation } from './store/api/authApi';
import { useAppDispatch} from './hooks/redux/useRedux';
import { setCredentials, setAuth } from './store/slices/authSlice';
import PrivateRoutes from './routes/PrivateRoutes';
import Layout from './routes/Layout';
import PublicRoutes from './routes/PublicRoutes';
// import Page404 from './components/pages/404/Page404';
import privateRoutes from './config/routes/privateRoutes';
import publicRoutes from './config/routes/publicRoutes';
import { handleApiError } from './utils/errors/handleApiError';
import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const [validToken] = useValidateMutation();
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (token) {
      try {
       (async function() {
            const data = await validToken(null).unwrap();
            if (data) {
              dispatch(setCredentials(data));          
              dispatch(setAuth(true));
            }
          })();
      } catch (err) {
        handleApiError(err);
      }
    }
  }, [token]);
  
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Layout />}>
          {privateRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Route>
      <Route element={<PublicRoutes />}>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
      {/* <Route path='*' element={<Page404 />} /> */}
    </Routes>
  );
}

export default App
