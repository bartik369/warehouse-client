import { useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Signin from './components/pages/signin/Signin';
import { useValidateMutation } from './store/api/authApi';
import { useAppDispatch} from './hooks/redux/useRedux';
import { setCredentials, setAuth } from './store/slices/authSlice';
import ResetPassword from './components/pages/reset/ResetPassword';
import PrivateRoutes from './routes/PrivateRoutes';
import { isFetchBaseQueryError, isErrorWithMessage} from './helpers/error-handling';
import Home from './components/pages/home/Home';
import Layout from './routes/Layout';
import PublicRoutes from './routes/PublicRoutes';
import Profile from './components/pages/profile/Profile';
import Device from './components/pages/device/Device';
import Devices from './components/pages/devices/Devices';
import AddDevice from './components/pages/add-device/AddDevice';
import Admin from './components/pages/admin/Admin';
import Users from './components/pages/users/Users';
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
        if (isFetchBaseQueryError(err)) {
          const errMsg = "error" in err ? err.error : JSON.stringify(err.data);
          console.log(errMsg);
        } else if (isErrorWithMessage(err)) {
          console.log(err);
        }
      }
    }
  }, [token]);
  
  return (
    <>
    <Routes>
      <Route element={<PrivateRoutes />}>
       <Route path='/' element={<Layout />}>
        <Route element={<Home />} path='/' />
        <Route element={<Profile />} path='/profile' />
        <Route element={<Device />} path='/devices/:id'/>
        <Route element={<Devices />} path='/devices/locations/:city'/>
        <Route element={<AddDevice />} path='/device/add'/>
        <Route element={<Users />} path='/users' />
        <Route element={<Admin />} path='/admin'/>
      </Route>
      </Route>
      <Route element={<PublicRoutes />}>
        <Route element={<Signin />} path='/signin' />
        <Route element={<ResetPassword />} path='/reset-password' />
      </Route>
    </Routes>
    </>
  )
}

export default App
