import { IUser } from './../../types/user';
import {createSlice} from '@reduxjs/toolkit';

type AuthState = {
    user: IUser;
    isAuth: boolean;
    error: string | null;
}

const initialState: AuthState = {
  user: {
    userId: '',
    workId: '',
    login: '',
    email: '',
    firstName: '',
    lastName: '',
    department: '',
    location: '',
    permissions: [],
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
            const {user, accessToken} = action.payload
            state.user = user;
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
