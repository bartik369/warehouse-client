import {
  PermissionState,
  PermissionAction,
  PermissionActionTypes,
} from "./permissionTypes";

export const initialState: PermissionState = {
  entity: {
    id: "",
    roleId: "",
    roleName: "",
    permissionIds: [],
    permissionsName: [],
    warehouseId: "",
    oldWarehouseId: "",
    warehouseName: "",
    locationId: "",
    oldLocationId: "",
    locationName: "",
    comment: "",
  },
  errors: {},
  isUpdate: false,
  list: {},
  permissionsRequest: false,
};
export function permissionReducer(
  state: PermissionState,
  action: PermissionAction
): PermissionState {
  switch (action.type) {
    case PermissionActionTypes.SET_ENTITY:
      return {
        ...state,
        entity: { ...state.entity, ...action.payload },
      };
    case PermissionActionTypes.RESET_ENTITY:
      return { ...state, entity: { ...initialState.entity }};
    case PermissionActionTypes.SET_PERMISSION: {
      const { id, name, checked } = action.payload;
      const currentNameArr = state.entity.permissionsName || [];
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
          permissionsName: checkValue(currentNameArr, name) || [],
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
      const permissionList = Object.fromEntries(permissionIds.map((id) => [id, true]))
      return {
        ...state,
        list: {
          ...state.list,
          ...permissionList,
        },
      };
    }
    case PermissionActionTypes.RESET_LIST:
      return { ...state, list: {} };
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
      return { ...state, errors: {} };
    case PermissionActionTypes.SET_PERMISSIONS_REQUEST:
      return { ...state, permissionsRequest: action.payload };
    case PermissionActionTypes.SET_IS_UPDATE:
      return { ...state, isUpdate: action.payload }
    case PermissionActionTypes.RESET_IS_UPDATE: 
    return { ... state, isUpdate: false }
    default:
      return state;
  }
}
