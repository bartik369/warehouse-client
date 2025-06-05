import {
  IUserRoleState,
  UserRoleAction,
  UserRoleActionsTypes,
} from "./userRoleTypes";

export const userRoleInitialState: IUserRoleState = {
  role: {
    id: "",
    userName: "",
    userId: "",
    roleName: "",
    roleId: "",
  },
  errors: {},
};

export function userRoleReducer(
  state: IUserRoleState,
  action: UserRoleAction
): IUserRoleState {
  switch (action.type) {
    case UserRoleActionsTypes.SET_ROLE:
      return {
        ...state,
        role: { ...state.role, ...action.payload },
      };
    case UserRoleActionsTypes.RESET_ROLE:
      return {
        ...state,
        role: { ...userRoleInitialState.role },
      };
    case UserRoleActionsTypes.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };
    case UserRoleActionsTypes.RESET_ERROR:
      return {
        ...state,
        errors: {},
      };
    default:
      return state;
  }
}
