import { useState } from 'react';

import { appToast } from '@/shared/lib/toast/toast';
import { FormMode } from '@/shared/types/form';
import {
  useCreateLocationMutation,
  useGetLocationQuery,
  useGetLocationsQuery,
  useUpdateLocationMutation,
} from '@/store/api/locationApi';

import { NOTIFICATIONS } from './constants';
import { LocationFormValues } from './schema';

export const useManageLocation = () => {
  const [createLocation] = useCreateLocationMutation();
  const [updateLocation] = useUpdateLocationMutation();
  const {
    data: locations = [],
    isFetching: locationsFetching,
    isLoading: locationsLoading,
  } = useGetLocationsQuery();
  const [editingId, setEditingId] = useState<string | null>(null);
  const { data: editingLocation } = useGetLocationQuery(editingId!, {
    skip: !editingId,
  });
  const mode: FormMode = editingId ? 'update' : 'create';

  const handleSubmit = async (data: LocationFormValues) => {
    if (editingId) {
      await updateLocation({
        id: editingId,
        ...data,
      }).unwrap();
      setEditingId(null);
      appToast.success(NOTIFICATIONS.updated);
      return;
    }
    await createLocation(data).unwrap();
    appToast.success(NOTIFICATIONS.created);
  };

  const handleDeleteLocation = async (id: string) => {
    console.log('test delete', id);
  };
  const handleGetLocation = (id: string) => {
    if (!id) return;
    setEditingId(id);
  };
  const handleResetId = () => {
    setEditingId(null);
  };

  return {
    mode,
    locations,
    editingLocation,
    locationsFetching,
    locationsLoading,
    onSave: handleSubmit,
    onEdit: handleGetLocation,
    onDelete: handleDeleteLocation,
    resetId: handleResetId,
  };
};
