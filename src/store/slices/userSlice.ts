import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { RootState } from "../store";

type UserAction = {
  user: User;
  users: User[];
  errors: Record<string, string>;
  checked: boolean;
  isAdmin: boolean;
};
const initialState: UserAction = {
    user: {
        id: '',
        userName: '',
        email: '',
        workId: '',
        firstNameRu: '',
        lastNameRu: '',
        firstNameEn: '',
        lastNameEn: '',
        isActive: true,
        department: '',
        departmentId: '',
        location: '',
        locationId: '',
    },
    users: [],
    errors: {},
    checked: true,
    isAdmin: false,
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      console.log(action.payload.user)
      state.user = action.payload.user;
    },
    updateUser: <K extends keyof User>(
      state: UserAction,
      action: PayloadAction<{ field: K; value: User[K] }>
    ) => {
      state.user[action.payload.field] = action.payload.value;
    },
    patchUser: (state, action: PayloadAction<Partial<User>>) => {
        state.user = { ...state.user, ...action.payload };
    },
    resetUser: (state) => {
      state.user = { ...initialState.user };
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      console.log(action.payload)
        state.users = action.payload;
    },
    resetUsers: (state) => {
      state.users = [];
    },
    updateUsers: (state, action: PayloadAction<User>) => {
        const existUser = state.users.some(user => user.id === action.payload.id);
        if (!existUser) {
            state.users.push(action.payload as User);
        }
    },
    setError: (state, action: PayloadAction<Record<string, string>>) => {
      state.errors = {
        ...state.errors,
        ...action.payload
      }
    },
    resetError: (state) => {
      state.errors = {};
    },
    setChecked: (state, action: PayloadAction<boolean>) => {
      state.checked = action.payload;
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
  },
});

export default userSlice.reducer;
export const {
    setUser,
    updateUser,
    patchUser,
    resetUser,
    setUsers,
    resetUsers,
    updateUsers,
    setError,
    resetError,
    setChecked,
    setIsAdmin,
} = userSlice.actions;

export const partnerUser = (state: RootState) => state.user.user;
