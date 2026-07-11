import { useState } from 'react';

import { appToast } from '@/shared/lib/toast/toast';
import { FormMode } from '@/shared/types/form';
import { useGetLocationsQuery } from '@/store/api/locationApi';
import {
  useCreateWarehouseMutation,
  useGetWarehouseQuery,
  useGetWarehousesQuery,
  useUpdateWarehouseMutation,
} from '@/store/api/warehousesApi';

import { NOTIFICATIONS } from './constants';
import { WarehouseFormValues } from './schema';

export const useManageWarehouse = () => {
  const [createWarehouse] = useCreateWarehouseMutation();
  const [updateWarehouse] = useUpdateWarehouseMutation();
  const {
    data: warehouses = [],
    isFetching: warehousesFetching,
    isLoading: warehousesLoading,
  } = useGetWarehousesQuery();
  const { data: locations = [] } = useGetLocationsQuery();
  const [editingId, setEditingId] = useState<string | null>(null);
  const { data: editingWarehouse } = useGetWarehouseQuery(editingId!, {
    skip: !editingId,
  });
  const mode: FormMode = editingId ? 'update' : 'create';

  const handleSubmit = async (data: WarehouseFormValues) => {
    if (editingId) {
      await updateWarehouse({
        id: editingId,
        ...data,
      }).unwrap();
      setEditingId(null);
      appToast.success(NOTIFICATIONS.updated, {
        position: 'top-center',
      });
      return;
    }
    await createWarehouse(data).unwrap();
    appToast.success(NOTIFICATIONS.created, {
      position: 'top-center',
    });
  };
  const handleDeleteWarehouse = async (id: string) => {
    console.log('test delete', id);
  };
  const handleGetWarehouse = (id: string) => {
    if (!id) return;
    setEditingId(id);
  };
  const handleResetId = () => {
    setEditingId(null);
  };

  return {
    mode,
    warehouses,
    locations,
    editingWarehouse,
    warehousesFetching,
    warehousesLoading,
    onSave: handleSubmit,
    onEdit: handleGetWarehouse,
    onDelete: handleDeleteWarehouse,
    resetId: handleResetId,
  };
};
