import { useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Signin from './components/pages/signin/Signin';
import { useValidateMutation } from './store/api/authApi';
import { useAppDispatch} from './hooks/redux/useRedux';
import { setCredentials, setAuth } from './store/slices/authSlice';
import ResetPassword from './components/pages/reset/ResetPassword';
import PrivateRoutes from './routes/PrivateRoutes';
import { isFetchBaseQueryError, 
  isErrorWithMessage} from './utils/errors/error-handling';
import Home from './components/pages/home/Home';
import Layout from './routes/Layout';
import PublicRoutes from './routes/PublicRoutes';
import Profile from './components/pages/profile/Profile';
import Device from './components/pages/device/Device';
import Devices from './components/pages/devices/Devices';
import AddDevice from './components/pages/admin/device/AddDevice';
import EditDevice from './components/pages/admin/device/EditDevice';
import AddUser from './components/pages/admin/user/AddUser';
import EditUser from './components/pages/admin/user/EditUser';
import Users from './components/pages/users/Users';
import AddDepartment from './components/pages/admin/department/AddDepartment';
import AddWarehouse from './components/pages/admin/warehouse/AddWarehouse';
import AddContractor from './components/pages/admin/contractor/AddContractor';
import AddRole from './components/pages/admin/permission/AddRole';
import AddPermission from './components/pages/admin/permission/AddPermission';
import AddManufacturer from './components/pages/admin/manufacturer/AddManufacturer';
import AddLocation from './components/pages/admin/city/AddLocation';
import AddModel from './components/pages/admin/model/AddModel';
import AddType from './components/pages/admin/type/AddType';
import Page404 from './components/pages/404/Page404';
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
          const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
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
        <Route element={<AddDevice />} path='/admin/add-device'/>
        <Route element={<EditDevice />} path='/admin/edit-device'/>
        <Route element={<AddUser />} path='/admin/add-user'/>
        <Route element={<EditUser />} path='/admin/edit-user'/>
        <Route element={<Users />} path='/users' />
        <Route element={<AddLocation />} path='/admin/add-location' />
        <Route element={<AddWarehouse/>} path='/admin/add-warehouse' />
        <Route element={<AddDepartment />} path='/admin/add-department' />
        <Route element={<AddContractor />} path='/admin/add-contractor' />
        <Route element={<AddRole />} path='/admin/add-role' />
        <Route element={<AddPermission />} path='/admin/add-permission' />
        <Route element={<AddManufacturer />} path='/admin/add-manufacturer' />
        <Route element={<AddModel />} path='/admin/add-model' />
        <Route element={<AddType />} path='/admin/add-type' />
      </Route>
      </Route>
      <Route element={<PublicRoutes />}>
        <Route element={<Signin />} path='/login' />
        <Route element={<ResetPassword />} path='/reset-password' />
      </Route>
      <Route element={<Page404 />} path='*' />
    </Routes>
    </>
  )
}

export default App
