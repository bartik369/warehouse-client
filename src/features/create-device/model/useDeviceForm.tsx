import { useFormContext, useWatch } from 'react-hook-form';
import { FaRegCircleDot } from 'react-icons/fa6';

import { SelectStatus } from '@/shared/ui/select-status/SelectStatus';
import { useGetContractorsQuery } from '@/store/api/contractorApi';
import { useCreateDeviceMutation } from '@/store/api/devicesApi';
import { useGetManufacturersQuery } from '@/store/api/manufacturersApi';
import { useGetModelsQuery } from '@/store/api/modelsApi';
import { useGetTypesQuery } from '@/store/api/typesApi';
import { useGetWarehousesQuery } from '@/store/api/warehousesApi';

import { DeviceFormValues } from './schema';

export const useCreateDeviceForm = () => {
  const { data: types = [] } = useGetTypesQuery();
  const { data: manufacturers = [] } = useGetManufacturersQuery();
  const { data: warehouses = [] } = useGetWarehousesQuery();
  const { data: contractors } = useGetContractorsQuery();
  const [createDevice, { isLoading }] = useCreateDeviceMutation();
  const { control, handleSubmit, getValues } = useFormContext<DeviceFormValues>();
  const manufacturerId = useWatch({
    control,
    name: 'manufacturerId',
  });
  const typeId = useWatch({
    control,
    name: 'typeId',
  });
  const modelId = useWatch({
    control,
    name: 'modelId',
  });
  const { data: models = [], isLoading: isLoadingModels } = useGetModelsQuery(
    { manufacturerId, typeId },
    {
      skip: !manufacturerId || !typeId,
    }
  );
  const selectedModel = models.find((model) => model.id === modelId);
  const selectedType = types.find((type) => type.id === typeId);
  console.log(selectedType);

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

  const handleCreate = async (data: DeviceFormValues) => {
    try {
      console.log(data);
      // await createDevice(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitForm = handleSubmit(handleCreate);

  const handleReset = () => {};

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
    handleSubmitForm,
    handleReset,
  };
};
