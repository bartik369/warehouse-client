import { useFormContext, useWatch } from 'react-hook-form';
import { FaRegCircleDot } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

import { isApiError } from '@/shared/lib/guards/is-api-error';
import { appToast } from '@/shared/lib/toast/toast';
import { SelectStatus } from '@/shared/ui/select-status/SelectStatus';
import { useGetContractorsQuery } from '@/store/api/contractorApi';
import { useCreateDeviceMutation } from '@/store/api/devicesApi';
import { useGetManufacturersQuery } from '@/store/api/manufacturersApi';
import { useGetModelsQuery } from '@/store/api/modelsApi';
import { useGetTypesQuery } from '@/store/api/typesApi';
import { useGetWarehousesQuery } from '@/store/api/warehousesApi';
import { currentUser } from '@/store/slices/authSlice';

import { NOTIFICATIONS } from './constants';
import { DeviceFormValues } from './schema';

export const useCreateDeviceForm = () => {
  const user = useSelector(currentUser);
  const { data: types = [] } = useGetTypesQuery();
  const { data: manufacturers = [] } = useGetManufacturersQuery();
  const { data: warehouses = [] } = useGetWarehousesQuery();
  const { data: contractors } = useGetContractorsQuery();
  const [createDevice, { isLoading: isCreating }] = useCreateDeviceMutation();
  const { control, handleSubmit, reset } = useFormContext<DeviceFormValues>();

  const manufacturerIds = useWatch({
    control,
    name: 'manufacturerIds',
  });

  const typeIds = useWatch({
    control,
    name: 'typeIds',
  });

  const modelId = useWatch({
    control,
    name: 'modelIds',
  });

  const { data: models = [], isLoading: isLoadingModels } = useGetModelsQuery(
    { manufacturerIds, typeIds },
    {
      skip: !manufacturerIds || !typeIds,
    }
  );

  const selectedModel = models.find((model) => model.id === modelId);
  const selectedType = types.find((type) => type.id === typeId);

  const manufacturersOptions = manufacturers.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const typesOptions = types.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const modelsOptions = models.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const warehousesOptions = warehouses.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const contractorsOptions = contractors?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const functionalOptions = [
    {
      value: 1,
      label: <SelectStatus label="Исправно" icon={FaRegCircleDot} color="var(--green-500)" />,
    },
    {
      value: 0,
      label: <SelectStatus label="Неисправно" icon={FaRegCircleDot} color="var(--red-400)" />,
    },
  ];

  const handleCreate = async (formData: DeviceFormValues) => {
    try {
      if (!user?.id) {
        console.error('User ID is missing');
        return;
      }
      const data = {
        ...formData,
        inStock: true,
        isAssigned: false,
        addedById: user.id,
        updatedById: user.id,
      };
      await createDevice(data).unwrap();
      reset();
      appToast.success(NOTIFICATIONS.added);
    } catch (error: unknown) {
      if (isApiError(error)) {
        appToast.error(error.data.message);
      }
    }
  };
  const handleSubmitForm = handleSubmit(handleCreate);

  const handleReset = () => {
    reset();
  };

  return {
    manufacturerId,
    typeId,
    manufacturers,
    types,
    selectedModel,
    selectedType,
    manufacturersOptions,
    typesOptions,
    modelsOptions,
    warehousesOptions,
    functionalOptions,
    contractorsOptions,
    isLoadingModels,
    isCreating,
    handleSubmitForm,
    handleReset,
  };
};
