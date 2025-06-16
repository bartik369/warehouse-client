import {
  UserRoleState,
  UserRoleAction,
  UserRoleActionsTypes,
} from "./userRoleTypes";

export const userRoleInitialState: UserRoleState = {
  role: {
    id: "",
    email: "",
    userId: "",
    roleName: "",
    roleId: "",
  },
  errors: {},
  query: "",
  isUsersListVisible: false,
  wasSearched: false,
  assignedUserRoles: {
    user: {
      userName: "",
      email: "",
      workId: "",
      firstNameRu: "",
      lastNameRu: "",
      firstNameEn: "",
      lastNameEn: "",
      department: "",
      location: "",
    },
    roles: [
      {
        locationName: "",
        warehouseName: "",
        roleName: "",
        permissionsName: [],
      },
    ],
  },
};

export function userRoleReducer(
  state: UserRoleState,
  action: UserRoleAction
): UserRoleState {
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
    case UserRoleActionsTypes.SET_QUERY:
      return { ...state, query: action.payload };
    case UserRoleActionsTypes.SET_USERS_LIST_VISIBLE:
      return { ...state, isUsersListVisible: action.payload };
    case UserRoleActionsTypes.SET_WAS_SEARCHED:
      return { ...state, wasSearched: action.payload };
    case UserRoleActionsTypes.SET_USER_ASSIGNED_ROLES:
      return {
        ...state, assignedUserRoles: action.payload
      }
    case UserRoleActionsTypes.RESET_USER_ASSIGNED_ROLES:
      return {
        ...state, assignedUserRoles: {
          user: {},
          roles: []
        }
      }
    default:
      return state;
  }
}
