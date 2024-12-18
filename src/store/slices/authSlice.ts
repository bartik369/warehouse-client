import { IUser } from './../../types/user';
import {createSlice} from '@reduxjs/toolkit';

type AuthState = {
    user: IUser;
    isAuth: boolean;
    error: string | null;
}

const initialState: AuthState = {
  user: {
    id: '',
    workId: '',
    login: '',
    email: '',
    firstName: '',
    lastName: '',
    department: '',
    locationId: '',
    createdAt: null,
    updatedAt: null,
  },
  isAuth: false,
  error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials:(state, action) => {
            state.user = action.payload;
        },
        logOut:(state, action) => {
            state.user = action.payload
            state.isAuth = false;
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    },
});

export default authSlice.reducer
export const  {setCredentials, setAuth,  logOut} = authSlice.actions;
