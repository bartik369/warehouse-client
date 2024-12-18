import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import Signin from './components/pages/signin/Signin';
import { useValidateQuery } from './store/api/authApi';
import { useAppDispatch, useAppSelector } from './hooks/redux/useRedux';
import { setCredentials } from './store/slices/authSlice';
import ResetPassword from './components/pages/reset/ResetPassword';
import PrivateRoutes from './routes/PrivateRoutes';
import Home from './components/pages/home/Home';
import Layout from './routes/Layout';
import PublicRoutes from './routes/PublicRoutes';
import Profile from './components/pages/profile/Profile';
import Device from './components/pages/devices/Device';
import Devices from './components/pages/devices/Devices';
import './App.scss';

function App() {
  const {data: userInfo} = useValidateQuery({skip: true});
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      userInfo && dispatch(setCredentials(userInfo))
    }
  }, []);
  
  return (
    <>
    <Routes>
    <Route path='/' element={<Layout />}>
      <Route element={<PrivateRoutes />}>
        <Route element={<Home />} path='/' />
        <Route element={<Profile />} path='/profile' />
        <Route element={<Device />} path='/device/:id'/>
        <Route element={<Devices />} path='/devices'/>
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
