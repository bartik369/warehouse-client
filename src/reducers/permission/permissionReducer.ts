import {
  IPermissionState,
  PermissionAction,
  PermissionActionTypes,
} from "./permissionTypes";

export const initialState: IPermissionState = {
  entity: {
    id: "",
    name: "",
    roleId: "",
    roleName: "",
    permissionId: [],
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
      const currentIdArr = state.entity.permissionId || [];

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
          permissionId: checkValue(currentIdArr, id) || [],
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
    case PermissionActionTypes.RESET_LIST:
      return { ...state, list: initialState.list };
    default:
      return state;
  }
}
