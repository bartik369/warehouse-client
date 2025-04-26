import { ChangeEvent, useCallback, useEffect, useReducer } from "react";
import { IPermissionRole, IRole } from "../../types/access";
import { IEntity } from "../../types/devices";
import { CheckedPermissionOptions } from "../../types/content";
import {
  FormValidation,
  validateField,
} from "../../utils/validation/PermissionValidation";
import {
  permissionReducer,
  initialState,
} from "../../reducers/permission/permissionReducer";
import { PermissionActionTypes } from "../../reducers/permission/permissionTypes";

export const usePermission = () => {
  const [state, dispatch] = useReducer(permissionReducer, initialState);
  const { isUpdate, entity, list } = state;

  const handleInputChange = useCallback(
    (field: keyof IPermissionRole, value: string) => {
      const validationErrors = validateField(field, value);
      dispatch({
        type: PermissionActionTypes.SET_ERROR,
        payload: validationErrors,
      });
      dispatch({
        type: PermissionActionTypes.SET_ENTITY,
        payload: { [field]: value },
      });
    },
    []
  );
  const handleCreateEntity = () => {
    try {
      const validationErrors = FormValidation(entity);
      dispatch({
        type: PermissionActionTypes.SET_ERROR,
        payload: validationErrors as Record<string, string>,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  };

  const handleGetEntity = useCallback((id: string, field: string) => {}, []);
  const handleDeleteEntity = useCallback(() => {}, []);

  const handleResetEntity = useCallback(() => {
    dispatch({ type: PermissionActionTypes.RESET_ENTITY });
    dispatch({ type: PermissionActionTypes.RESET_LIST });
    dispatch({ type: PermissionActionTypes.RESET_ERROR });
  }, []);
  const handleRoleChange = useCallback(
    (item: IRole) => {
      handleInputChange("roleId", item.id || "");
      handleInputChange("roleName", item.name || "");
    },
    [handleInputChange]
  );
  const handlePermissionChange = useCallback(
    (item: IPermissionRole) => {
      handleInputChange("permissionId", item.id || "");
      handleInputChange("permissionName", item.name || "");
    },
    [handleInputChange]
  );
  const handleLocationChange = useCallback(
    (item: IEntity) => {
      handleInputChange("locationId", item.id || "");
      handleInputChange("locationName", item.name || "");
    },
    [handleInputChange]
  );
  const handleWarehouseChange = useCallback(
    (item: IEntity) => {
      console.log(item);
      handleInputChange("warehouseId", item.id || "");
      handleInputChange("warehouseName", item.name || "");
    },
    [handleInputChange]
  );
  const handleCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>, item: CheckedPermissionOptions, name: string) => {
      const { checked } = e.target;

      dispatch({
        type: PermissionActionTypes.SET_LIST,
        payload: { id: item.id || "", checked },
      });
      dispatch({
        type: PermissionActionTypes.SET_PERMISSION,
        payload: { id: item.id || "", name: item.name || "", checked },
      });
      const updatedCheckList = {
        ...list,
        [item.id]: checked,
      }
      const validationErrors = validateField(name, updatedCheckList);
      dispatch({
        type: PermissionActionTypes.SET_ERROR,
        payload: validationErrors,
      });
    },
    [list]
  );
  
  useEffect(() => {
    if (state.entity.roleName === "manager") {
      dispatch({
        type: PermissionActionTypes.SET_ENTITY,
        payload: {
          permissionName: [],
          permissionId: [],
          warehouseId: "",
          warehouseName: "",
        },
      });
      dispatch({ type: PermissionActionTypes.RESET_LIST });
    }
  }, [state.entity.roleName]);

  return {
    entity,
    isUpdate,
    state,
    actions: {
      handleInputChange,
      handleGetEntity,
      handleCreateEntity,
      handleDeleteEntity,
      handleResetEntity,
      handleRoleChange,
      handlePermissionChange,
      handleLocationChange,
      handleWarehouseChange,
      handleCheck,
    },
  };
};
