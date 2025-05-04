import {
  IPermissionState,
  PermissionAction,
  PermissionActionTypes,
} from "./permissionTypes";

export const initialState: IPermissionState = {
  entity: {
    id: "",
    roleId: "",
    roleName: "",
    permissionIds: [],
    permissionName: [],
    warehouseId: "",
    warehouseName: "",
    locationId: "",
    locationName: "",
    comment: "",
  },
  errors: {},
  isUpdate: false,
  list: {},
  permissionsRequest: false,
};
export function permissionReducer(
  state: IPermissionState,
  action: PermissionAction
): IPermissionState {
  switch (action.type) {
    case PermissionActionTypes.SET_ENTITY:
      return {
        ...state,
        entity: { ...state.entity, ...action.payload },
      };
    case PermissionActionTypes.RESET_ENTITY:
      return { ...state, entity: initialState.entity };
    case PermissionActionTypes.SET_PERMISSION: {
      const { id, name, checked } = action.payload;
      const currentNameArr = state.entity.permissionName || [];
      const currentIdArr = state.entity.permissionIds || [];

      const checkValue = <T>(arr: T[], value: T) => {
        const result = checked
          ? arr.includes(value)
            ? arr
            : [...arr, value]
          : arr.filter((item) => item !== value);
        return result;
      };
      return {
        ...state,
        entity: {
          ...state.entity,
          permissionName: checkValue(currentNameArr, name) || [],
          permissionIds: checkValue(currentIdArr, id) || [],
        },
      };
    }
    case PermissionActionTypes.SET_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.id]: action.payload.checked,
        },
      };
    case PermissionActionTypes.SET_LIST_BY_ROLE: {
      const permissionIds = action.payload.permissionIds ?? [];
      const permissionList = permissionIds?.reduce((acc, elem) => {
        acc[elem] = true;
        return acc;
      }, {} as Record<string, boolean>);
      
      return {
        ...state,
        list: {
          ...state.list,
          ...permissionList,
        },
      };
    }
    case PermissionActionTypes.RESET_LIST:
      return { ...state, list: initialState.list };
    case PermissionActionTypes.RESET_WAREHOUSE:
      return {
        ...state,
        entity: {
          ...state.entity,
          warehouseId: "",
          warehouseName: "",
        },
      };
    case PermissionActionTypes.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };
    case PermissionActionTypes.RESET_ERROR:
      return { ...state, errors: initialState.errors };
    case PermissionActionTypes.SET_PERMISSIONS_REQUEST:
      return { ...state, permissionsRequest: action.payload };
    default:
      return state;
  }
}
