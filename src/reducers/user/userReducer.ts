import { IUserState, UserAction, UserActionTypes } from "./userTypes";

export const userInitialState: IUserState = {
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

export function userReducer(
  state: IUserState,
  action: UserAction
): IUserState {
    switch (action.type) {
        case UserActionTypes.SET_USER:
        return {
            ...state, user: {...state.user, ...action.payload }
        }
        case UserActionTypes.RESET_USER:
            return { ...state,  user: { ...userInitialState.user }}
        case UserActionTypes.SET_USERS:
            return { ...state, users: action.payload }
        case UserActionTypes.RESET_USERS:
            return { ...state, users: [] }
        case UserActionTypes.SET_ERROR:
            return {
                ...state, 
                errors: {
                     ...state.errors, 
                     ...action.payload,
                }
            }
        case UserActionTypes.RESET_ERROR:
            return { ...state, errors: {} }
        case UserActionTypes.SET_CHECKED:
            return {
                ...state, checked: action.payload,
            }
        case UserActionTypes.SET_IS_ADMIN:
            return { ...state, isAdmin: action.payload }
        default:
            return state
    }
}