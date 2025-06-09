import { ChangeEvent, useCallback, useEffect, useReducer } from "react";
import { IPermissionRole, IPermissionRoleRes, IRole, IUserRolesList } from "../../types/access";
import { IEntity } from "../../types/devices";
import { CheckedPermissionOptions } from "../../types/content";
import {
  useCreatePermissionRoleMutation,
  useUpdatePermissionRoleMutation,
} from "../../store/api/permissionApi";
import {
  FormValidation,
  validateField,
} from "../../utils/validation/PermissionValidation";
import {
  permissionReducer,
  initialState,
} from "../../reducers/permission/permissionReducer";
import { PermissionActionTypes } from "../../reducers/permission/permissionTypes";
import { handleApiError } from "../../utils/errors/handleApiError";

export const usePermission = () => {
  const [state, dispatch] = useReducer(permissionReducer, initialState);
  const { isUpdate, entity, list } = state;
  const [createPermissionRole] = useCreatePermissionRoleMutation();
  const [updatePermissionRole] = useUpdatePermissionRoleMutation();

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

  const handleCreateEntity = async () => {
    try {
      const validationErrors = FormValidation(entity);
      if (Object.values(validationErrors).length > 0) {
        dispatch({
          type: PermissionActionTypes.SET_ERROR,
          payload: validationErrors as Record<string, string>,
        });
        return;
      }
      if (!isUpdate) {
        const data = await createPermissionRole(entity).unwrap();
        if (data) {
          handleResetEntity();
        }
      } else {
        const data = await updatePermissionRole(entity).unwrap();
        if (data) {
          handleResetEntity();
        }
      }
    } catch (err: unknown) {
      handleApiError(err);
    }
  };

  const handleGetEntity = useCallback((id: string, field: string) => {}, []);
  const handleDeleteEntity = useCallback(() => {}, []);

  const handleResetEntity = useCallback(() => {
    dispatch({ type: PermissionActionTypes.RESET_ENTITY });
    dispatch({ type: PermissionActionTypes.RESET_LIST });
    dispatch({ type: PermissionActionTypes.RESET_ERROR });
    dispatch({ type: PermissionActionTypes.RESET_IS_UPDATE });
  }, []);

  const handleRoleChange = useCallback(
    (item: IRole) => {
      handleInputChange("roleId", item.id || "");
      handleInputChange("roleName", item.name || "");
    },
    [handleInputChange]
  );
  const handleLocationChange = useCallback(
    (item: IEntity) => {
      handleInputChange("locationId", item.id || "");
      handleInputChange("locationName", item.name || "");
      dispatch({ type: PermissionActionTypes.RESET_WAREHOUSE });
    },
    [handleInputChange]
  );
  const handleWarehouseChange = useCallback(
    (item: IEntity) => {
      handleInputChange("warehouseId", item.id || "");
      handleInputChange("warehouseName", item.name || "");
    },
    [handleInputChange]
  );
  const handleCheck = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      item: CheckedPermissionOptions,
      name: string
    ) => {
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
      };
      const validationErrors = validateField(name, updatedCheckList);
      dispatch({
        type: PermissionActionTypes.SET_ERROR,
        payload: validationErrors,
      });
    },
    [list]
  );

  const handleRoleInfo = useCallback((item: Partial<IPermissionRole> ) => {
    dispatch({ type: PermissionActionTypes.RESET_LIST });
    dispatch({ type: PermissionActionTypes.RESET_ENTITY });
    const data = {
      ...item,
      oldLocationId: item.locationId || '',
      oldWarehouseId: item.warehouseId || '',
    }
    dispatch({
      type: PermissionActionTypes.SET_ENTITY,
      payload: data,
    });
    dispatch({
      type: PermissionActionTypes.SET_LIST_BY_ROLE,
      payload: item,
    });
    dispatch({ type: PermissionActionTypes.SET_IS_UPDATE, payload: true });
  }, [dispatch]);
  
  const handleDeleteRolePerms = (item:IUserRolesList) => {
    console.log(item);
    
  }

  useEffect(() => {
    if (state.entity.roleName === "manager") {
      dispatch({
        type: PermissionActionTypes.SET_ENTITY,
        payload: {
          permissionsName: [],
          permissionIds: [],
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
      handleLocationChange,
      handleWarehouseChange,
      handleCheck,
      handleRoleInfo,
      handleDeleteRolePerms,
    },
  };
};
