import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useInputMask } from './useInputMask';
import {
  FormValidation,
  ValidateField,
} from '../../utils/validation/AdminEntityValidation';
import {
  useLazyGetManufacturerQuery,
  useCreateManufacturerMutation,
  useUpdateManufacturerMutation,
} from '../../store/api/manufacturersApi';
import {
  useCreateDepartmentMutation,
  useLazyGetDepartmentQuery,
  useUpdateDepartmentMutation,
} from '../../store/api/departmentApi';
import {
  useCreateLocationMutation,
  useLazyGetLocationQuery,
  useUpdateLocationMutation,
} from '../../store/api/locationApi';
import {
  useCreateWarehouseMutation,
  useLazyGetWarehouseQuery,
  useUpdateWarehouseMutation,
} from '../../store/api/warehousesApi';
import {
  useCreateContractorMutation,
  useLazyGetContractorQuery,
  useUpdateContractorMutation,
} from '../../store/api/contractorApi';
import { 
  useCreateModelMutation, 
  useLazyGetModelQuery, 
  useUpdateModelMutation,
} from '../../store/api/modelsApi';
import { 
  useCreateTypeMutation, 
  useLazyGetTypeQuery,
  useUpdateTypeMutation,
 } from '../../store/api/typesApi';
 import { 
  useCreatePermissionMutation, 
  useLazyGetPermissionQuery, 
  useLazyGetRoleQuery,
  useCreateRoleMutation, 
  useUpdatePermissionMutation, 
  useUpdateRoleMutation,
  useDeletePermissionMutation,
  useDeleteRoleMutation,
} from '../../store/api/permissionApi';
import { IDeviceMedia, IEntity } from '../../types/devices';
import { handleApiError } from '../../utils/errors/handleApiError';
import { selectPic } from '../../utils/constants/constants';

export const useAddAdminEntities = () => {
  const [entity, setEntity] = useState<IEntity>({
    id: '',
    name: '',
    slug: '',
    locationName: '',
    typeId: '',
    type: '',
    manufacturerId: '',
    manufacturer: '',
    phoneNumber: '',
    comment: '',
    address: '',
  });
  const [media, setMedia] = useState<IDeviceMedia>({
    file: null,
    prevImg: null,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { formatPhone, changeFormatPhone } = useInputMask();

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
  
  const entityDeleteFunctions: Record<string, (item: any) => { unwrap: () => Promise<any>}> = {
    role: deleteRole,
    permission: deletePermission,
  }

  const entityCreateFunctions: Record<string, (item: any) => { unwrap: () => Promise<any> }> = {
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
  const entityById: Record<string, (item: any) => { unwrap: () => Promise<any> }
  > = {
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

  const handleInputChange = useCallback(
    <T extends string | IEntity>(field: keyof IEntity, value: T) => {
      setErrors((prev) => ({
        ...prev,
        [field]: ValidateField(field, value) || '',
      }));
      setEntity((prev) => {
        const updateEntity = {
          ...prev,
          [field]:
            field === 'phoneNumber'
              ? formatPhone(value as string, prev.phoneNumber || '')
              : value,
        };
        return updateEntity;
      });
    },
    []
  );

  const handleCreateEntity = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>, fieldType: string) => {
      e.preventDefault();
      try {
        const createEntityFunction = entityCreateFunctions[fieldType];
        const validationErrors = FormValidation(entity, fieldType);
        setErrors(validationErrors as Record<string, string>);

        if (Object.keys(validationErrors).length === 0) {
          if (!entity) return;
          if (fieldType === 'model') {
            const formData = new FormData();
            (Object.keys(entity) as (keyof IEntity)[]).forEach((key) => {
              const value = entity[key];
              if (value !== undefined && value !== null)
                formData.append(key, value);
            });

            if (media.file) formData.append('file', media.file);
            await createEntityFunction(formData)
              .unwrap()
              .then((data) => {
                handleResetEntity();
                toast(data?.message, { type: 'success' });
              });
          } else {
            const updateData = {
              ...entity,
              phoneNumber: changeFormatPhone(entity.phoneNumber || ''),
            };
            await createEntityFunction(updateData)
              .unwrap()
              .then((data) => {
                toast(data?.message, { type: 'success' });
              });
            handleResetEntity();
          }
        }
      } catch (err: unknown) {
        handleApiError(err);
      }
    },
    [entity, FormValidation, isUpdate]
  );

  const handleResetEntity = useCallback(() => {
    setEntity({
      id: '',
      name: '',
      slug: '',
      locationName: '',
      comment: '',
      phoneNumber: '',
      address: '',
      type: '',
      typeId: '',
      manufacturer: '',
      manufacturerId: ''
    });
    setIsUpdate(false);
  }, []);

  const handleGetEntity = useCallback(async (id: string, field: string) => {
    try {
      const getEntityByIdFunction = entityById[field];
      await getEntityByIdFunction(id)
        .unwrap()
        .then((data) => {
          setEntity((prev) => ({
            ...prev,
            ...data,
          }));
        });
      setIsUpdate(true);
    } catch (err: unknown) {
      handleApiError(err);
    }
  }, []);

  const handleCityChange = useCallback(
    (item: IEntity) => {
      handleInputChange('locationName', item.name || '');
    },
    [handleInputChange]
  );
  const handleManufacturerChange = useCallback(
    (item: IEntity) => {
      handleInputChange('manufacturerId', item.id || '');
      handleInputChange('manufacturer', item.name || '');
    },
    [handleInputChange]
  );
  const handleTypeChange = useCallback(
    (item:IEntity) => {
      handleInputChange('typeId', item.id || '');
      handleInputChange('type', item.name || '');
    },
    [handleInputChange]
  );

  const handleMedia = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.type.startsWith('image/') && !file.type.endsWith('.gif')) {
          const objectUrl = URL.createObjectURL(file);
          setMedia({ file: file, prevImg: objectUrl });
          return () => URL.revokeObjectURL(objectUrl);
        } else {
          toast(selectPic, { type: 'error' });
        }
      }
    },
    [media]
  );
  const handleDeleteEntity = async (id: string, fieldType: string) => {
    const deleteEntityFunction = entityDeleteFunctions[fieldType]
    await deleteEntityFunction(id).unwrap().then((data) => {
      toast(data?.message, { type: 'success' });
    });
  }
  
  return {
    entity,
    errors,
    isUpdate,
    media,
    fileInputRef,
    handleMedia,
    handleCityChange,
    setEntity,
    handleCreateEntity,
    handleInputChange,
    handleResetEntity,
    handleGetEntity,
    handleManufacturerChange,
    handleTypeChange,
    handleDeleteEntity
  };
};
