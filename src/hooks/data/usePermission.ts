import { ChangeEvent, useCallback, useEffect, useReducer } from "react";
import { IPermissionRole, IRole } from "../../types/access";
import { IEntity } from "../../types/devices";
import { CheckedPermissionOptions } from "../../types/content";
import { 
  useCreatePermissionRoleMutation, 
  useLazyGetPermissionsByRoleIdQuery,
  useUpdatePermissionRoleMutation,
} from "../../store/api/permissionApi";
import { FormValidation, validateField } from "../../utils/validation/PermissionValidation";
import { permissionReducer, initialState } from "../../reducers/permission/permissionReducer";
import { PermissionActionTypes } from "../../reducers/permission/permissionTypes";
import { handleApiError } from "../../utils/errors/handleApiError";

export const usePermission = () => {
  const [state, dispatch] = useReducer(permissionReducer, initialState);
  const { isUpdate, entity, list, permissionsRequest } = state;
  const [createPermissionRole] = useCreatePermissionRoleMutation();
  const [updatePermissionRole] = useUpdatePermissionRoleMutation();
  const [getPermissionsByRole] = useLazyGetPermissionsByRoleIdQuery();

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

  console.log('entity ====>>', entity)
  
  const handleCreateEntity = async() => {
    try {
      console.log('start');
      const validationErrors = FormValidation(entity);
      console.log(validationErrors);
      if (Object.values(validationErrors).length > 0) {
        dispatch({
          type: PermissionActionTypes.SET_ERROR,
          payload: validationErrors as Record<string, string>,
        });
        return;
      }
      console.log(isUpdate);
      if (!isUpdate) {
        console.log('create');
        
        const data = await createPermissionRole(entity).unwrap();
        if (data) {
          console.log(data)
        }
      } else {
        const data = await updatePermissionRole(entity).unwrap();
        if (data) {
          console.log(data)
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
  }, []);
  const handleRoleChange = useCallback(
    (item: IRole) => {
      handleInputChange("roleId", item.id || "");
      handleInputChange("roleName", item.name || "");
    },
    [handleInputChange]
  );
  const handlePermissionChange = useCallback(
    (item: IRole) => {
      handleInputChange("permissionIds", item.id || "");
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
          permissionIds: [],
          warehouseId: "",
          warehouseName: "",
        },
      });
      dispatch({ type: PermissionActionTypes.RESET_LIST });
    }
  }, [state.entity.roleName]);

  useEffect(() => {
    dispatch({
      type: PermissionActionTypes.SET_PERMISSIONS_REQUEST, 
      payload: false 
    });
    if (!permissionsRequest) {
      dispatch({ type: PermissionActionTypes.RESET_WAREHOUSE })
    }
  }, [entity.locationId]);

  // useEffect(() => {
  //   if (!entity.roleId) return;
  //   (async () => {
  //     try {
  //       const data = await getPermissionsByRole(entity.roleId).unwrap();
  //       if (data) {
  //         dispatch({
  //           type: PermissionActionTypes.SET_PERMISSIONS_REQUEST, 
  //           payload: true 
  //         });
  //         dispatch({
  //           type: PermissionActionTypes.SET_ENTITY,
  //           payload: data
  //         });
  //         dispatch({ type: PermissionActionTypes.RESET_LIST });
  //         dispatch({
  //           type: PermissionActionTypes.SET_LIST_BY_ROLE,
  //           payload: data,
  //         })
  //       }
  //     } catch (err) {
  //       handleApiError(err);
  //     }
  //   })()
  // }, [entity.roleId]);

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
