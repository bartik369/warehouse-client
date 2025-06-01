import { useCallback, useReducer, useRef } from "react";
import { toast } from "react-toastify";
import { useInputMask } from "./useInputMask";
import {
  FormValidation,
  ValidateField,
} from "../../utils/validation/AdminEntityValidation";
import {
  useLazyGetManufacturerQuery,
  useCreateManufacturerMutation,
  useUpdateManufacturerMutation,
} from "../../store/api/manufacturersApi";
import {
  useCreateDepartmentMutation,
  useLazyGetDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../../store/api/departmentApi";
import {
  useCreateLocationMutation,
  useLazyGetLocationQuery,
  useUpdateLocationMutation,
} from "../../store/api/locationApi";
import {
  useCreateWarehouseMutation,
  useLazyGetWarehouseQuery,
  useUpdateWarehouseMutation,
} from "../../store/api/warehousesApi";
import {
  useCreateContractorMutation,
  useLazyGetContractorQuery,
  useUpdateContractorMutation,
} from "../../store/api/contractorApi";
import {
  useCreateModelMutation,
  useLazyGetModelQuery,
  useUpdateModelMutation,
} from "../../store/api/modelsApi";
import {
  useCreateTypeMutation,
  useLazyGetTypeQuery,
  useUpdateTypeMutation,
} from "../../store/api/typesApi";
import {
  useCreatePermissionMutation,
  useLazyGetPermissionQuery,
  useLazyGetRoleQuery,
  useCreateRoleMutation,
  useUpdatePermissionMutation,
  useUpdateRoleMutation,
  useDeletePermissionMutation,
  useDeleteRoleMutation,
} from "../../store/api/permissionApi";
import { IEntity } from "../../types/devices";
import { handleApiError } from "../../utils/errors/handleApiError";
import { selectPic } from "../../utils/constants/constants";
import { adminEntityReducer, initialState } from "../../reducers/admin-entity/adminEntityReducer";
import { AdminEntityActionTypes } from "../../reducers/admin-entity/adminEntityTypes";

export const useAddAdminEntities = () => {
  const [state, dispatch] = useReducer(adminEntityReducer, initialState);
  const { isUpdate, entity } = state;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { changeFormatPhone } = useInputMask();
  const [getWarehouse] = useLazyGetWarehouseQuery();
  const [getLocation] = useLazyGetLocationQuery();
  const [getDepartment] = useLazyGetDepartmentQuery();
  const [getContractor] = useLazyGetContractorQuery();
  const [getManufacturer] = useLazyGetManufacturerQuery();
  const [getModel] = useLazyGetModelQuery();
  const [getType] = useLazyGetTypeQuery();
  const [getRole] = useLazyGetRoleQuery();
  const [getPermission] = useLazyGetPermissionQuery();

  const [createDepartment] = useCreateDepartmentMutation();
  const [createLocation] = useCreateLocationMutation();
  const [createWarehouse] = useCreateWarehouseMutation();
  const [createManufacturer] = useCreateManufacturerMutation();
  const [createContractor] = useCreateContractorMutation();
  const [createModel] = useCreateModelMutation();
  const [createType] = useCreateTypeMutation();
  const [createRole] = useCreateRoleMutation();
  const [createPermission] = useCreatePermissionMutation();

  const [updateContractor] = useUpdateContractorMutation();
  const [updateManufacturer] = useUpdateManufacturerMutation();
  const [updateWarehouse] = useUpdateWarehouseMutation();
  const [updateLocation] = useUpdateLocationMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [updateModel] = useUpdateModelMutation();
  const [updateType] = useUpdateTypeMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [updatePermission] = useUpdatePermissionMutation();

  const [deleteRole] = useDeleteRoleMutation();
  const [deletePermission] = useDeletePermissionMutation();

  const entityDeleteFunctions: Record<
    string,
    (item: any) => { unwrap: () => Promise<any> }
  > = {
    role: deleteRole,
    permission: deletePermission
  }

  const entityCreateFunctions: Record<string,
    (item: any) => { unwrap: () => Promise<any> }> = {
    department: isUpdate ? updateDepartment : createDepartment,
    warehouse: isUpdate ? updateWarehouse : createWarehouse,
    location: isUpdate ? updateLocation : createLocation,
    manufacturer: isUpdate ? updateManufacturer : createManufacturer,
    contractor: isUpdate ? updateContractor : createContractor,
    model: isUpdate ? updateModel : createModel,
    type: isUpdate ? updateType : createType,
    role: isUpdate ? updateRole : createRole,
    permission: isUpdate ? updatePermission : createPermission,
  };
  const entityById: Record<string, 
  (item: any) => { unwrap: () => Promise<any> } > = {
    department: getDepartment,
    warehouse: getWarehouse,
    location: getLocation,
    manufacturer: getManufacturer,
    contractor: getContractor,
    model: getModel,
    type: getType,
    role: getRole,
    permission: getPermission,
  };

  console.log(state.entity)

  const handleInputChange = useCallback(
    <T extends string | IEntity>(field: keyof IEntity, value: T) => {
      dispatch({
        type: AdminEntityActionTypes.SET_ERROR,
        payload: { [field]: ValidateField(field, value) || "" },
      });
      dispatch({
        type: AdminEntityActionTypes.SET_ENTITY,
        payload: { [field]: value },
      });
    },
  []);

  const handleCreateEntity = useCallback(async (fieldType: string) => {
      try {
        const createEntityFunction = entityCreateFunctions[fieldType];
        const validationErrors = FormValidation(entity, fieldType);
        dispatch({ 
          type: AdminEntityActionTypes.SET_ERROR, 
          payload: validationErrors as Record<string, string>
        });

        if (Object.keys(validationErrors).length === 0) {
          if (!entity) return;
          if (fieldType === "model") {
            const formData = new FormData();
            (Object.keys(entity) as (keyof IEntity)[]).forEach((key) => {
              const value = entity[key];
              if (value !== undefined && value !== null)
                formData.append(key, value);
            });

            if (state.media.file) formData.append("file", state.media.file);
            const data = await createEntityFunction(formData).unwrap();
            if (data) {
              dispatch({ type: AdminEntityActionTypes.RESET_ENTITY });
              toast(data?.message, { type: "success" });
            }
          } else {
            const updateData = {
              ...entity,
              phoneNumber: changeFormatPhone(entity.phoneNumber || ""),
            };
            const data = await createEntityFunction(updateData).unwrap();
            if (data) {
              toast(data?.message, { type: "success" });
              handleResetEntity();
            }
          }
        }
      } catch (err: unknown) {
        handleApiError(err);
      }
    },
    [entity, FormValidation, isUpdate]
  );

  const handleResetEntity = useCallback(() => {
    dispatch({ type: AdminEntityActionTypes.RESET_ENTITY });
    dispatch({ type: AdminEntityActionTypes.SET_IS_UPDATE, payload: false});
    dispatch({ type: AdminEntityActionTypes.RESET_ERROR });
  }, []);

  const handleGetEntity = useCallback(async (id: string, field: string) => {
    try {
      const getEntityByIdFunction = entityById[field];
      const data = await getEntityByIdFunction(id).unwrap();
      if (data) {
        console.log(data)
        dispatch({ type: AdminEntityActionTypes.SET_ENTITY, payload: data });
      }
      dispatch({ type: AdminEntityActionTypes.SET_IS_UPDATE, payload: true});
    } catch (err: unknown) {
      handleApiError(err);
    }
  }, []);

  const handleMedia = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file && (file.type.startsWith("image/")) && !file.type.endsWith(".gif")) {
          const objectUrl = URL.createObjectURL(file);
          dispatch({ type: AdminEntityActionTypes.SET_FILE, payload: file });
          dispatch({ type: AdminEntityActionTypes.SET_PREVIEW, payload: objectUrl });
          return () => URL.revokeObjectURL(objectUrl);
        } else {
          toast(selectPic, { type: "error" });
        }
      }
    },
    [state.media]
  );
  const handleDeleteEntity = useCallback(
    async (id: string, fieldType: string) => {
      try {
        const deleteEntityFunction = entityDeleteFunctions[fieldType];
        const data = await deleteEntityFunction(id).unwrap();
        if (data) {
          toast(data?.message, { type: "success" });
        }
      } catch (err: unknown) {
        handleApiError(err);
      }
    },
    []
  );

  return {
    entity,
    state,
    isUpdate,
    fileInputRef,
    actions: {
      handleMedia,
      handleCreateEntity,
      handleInputChange,
      handleResetEntity,
      handleGetEntity,
      handleDeleteEntity,
    }
  };
};
