import './App.scss'
import {Routes, Route} from 'react-router-dom'
import Signin from './components/pages/signin/Signin'
import ResetPassword from './components/pages/reset/ResetPassword'
import PrivateRoutes from './routes/PrivateRoutes'
import Home from './components/pages/home/Home'
import Layout from './routes/Layout'
import { useAppDispatch, useAppSelector } from './hooks/redux/useRedux'
import PublicRoutes from './routes/PublicRoutes'
import Profile from './components/pages/profile/Profile'
import Device from './components/pages/devices/Device'
import Devices from './components/pages/devices/Devices'
import { useLogoutUserMutation } from './store/api/authApi';

function App() {

  const [logout] = useLogoutUserMutation();
  const dispatch = useAppDispatch()
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

    <button onClick={() => dispatch(logout)}>Test logout</button>
    </>
  )
}

export default App
