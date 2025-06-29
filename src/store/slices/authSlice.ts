import { RootState } from '../store';
import { User } from '@/types/user';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AuthState = {
    user: User | null;
    isAuth: boolean;
    error: string | null;
}

const initialState: AuthState = {
  user: {
      id: '',
      workId: '',
      userName: '',
      email: '',
      firstNameRu: '',
      lastNameRu: '',
      firstNameEn: '',
      lastNameEn: '',
      department: '',
      isActive: true,
      location: '',
      createdAt: null,
      updatedAt: null,
      departmentId: '',
      locationId: ''
  },
  
  isAuth: false,
  error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials:(state, action:PayloadAction<User | null>) => {
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

export default authSlice.reducer;
export const {setCredentials, setAuth,  logOut} = authSlice.actions;
export const currentUser = (state: RootState) => state.auth.user;
