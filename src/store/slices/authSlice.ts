import { IUser } from './../../types/user';
import {createSlice} from '@reduxjs/toolkit';

type AuthState = {
    user: IUser;
    isAuth: boolean;
    token: string | null;
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
  token: null,
  error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials:(state, action) => {
            const {user, token} = action.payload
            state.user = user;
            state.token = token;
        },
        logOut:(state, action) => {
            state.user = action.payload
            state.token = null;
            state.isAuth = false;
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    },
});

export default authSlice.reducer
export const  {setCredentials, setAuth,  logOut} = authSlice.actions;
