import { useMemo, useState } from 'react';

import { Manufacturer } from '@/entities/manufacturer/model/types';
import { DeviceType } from '@/entities/type/model/types';
import { PATHS } from '@/shared/api/paths';
import { useTablePagination } from '@/shared/hooks/useTablePagination';
import { appToast } from '@/shared/lib/toast/toast';
import { FormMode } from '@/shared/types/form';
import {
  useCreateDepartmentMutation,
  useGetDepartmentQuery,
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation,
} from '@/store/api/departmentApi';
import { useGetManufacturersQuery } from '@/store/api/manufacturersApi';
import {
  useCreateModelMutation,
  useGetAllModelsQuery,
  useGetModelQuery,
  useGetModelsQuery,
  useUpdateModelMutation,
} from '@/store/api/modelsApi';
import { useGetTypesQuery } from '@/store/api/typesApi';

import { NOTIFICATIONS } from './constants';
import { ModelFormValues } from './schema';
import { ModelFilter } from './types';

export const useManageModel = () => {
  const { page, limit, setPage, setLimit } = useTablePagination();
  const [createModel] = useCreateModelMutation();
  const [updateModel] = useUpdateModelMutation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modelImg, setModelImg] = useState<File | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const { data: editingModel } = useGetModelQuery(editingId!, {
    skip: !editingId,
  });
  const [modelFilter, setModelFilter] = useState<ModelFilter | null>(null);
  const { data: manufacturers = [] } = useGetManufacturersQuery();
  const { data: types = [] } = useGetTypesQuery();

  const manufacturersOptions = manufacturers.map((item: Manufacturer) => ({
    value: item.id,
    label: item.name,
  }));

  const typesOptions = types.map((item: DeviceType) => ({
    value: item.id,
    label: item.name,
  }));

  const {
    data: models = [],
    isFetching: modelsFetching,
    isLoading: modelsLoading,
  } = useGetAllModelsQuery();
  const mode: FormMode = editingId ? 'update' : 'create';

  const serverImageUrl =
    editingId && editingModel?.imagePath ? `${PATHS.models}${editingModel.imagePath}` : null;
  const previewUrl = localPreviewUrl ?? serverImageUrl;

  const handleSubmit = async (data: ModelFormValues) => {
    try {
      if (!data) return;
      const formData = new FormData();
      if (modelImg) {
        formData.append('file', modelImg);
      }
      Object.entries(data).forEach(([key, value]) => {
        if (value != null && value !== '') {
          formData.append(key, value);
        }
      });
      if (mode === 'create') {
        const res = await createModel(formData).unwrap();
        if (res) appToast.success(NOTIFICATIONS.created);
        return;
      }
      if (!editingId) return;
      const res = await updateModel({ id: editingId, body: formData }).unwrap();
      if (res) appToast.success(NOTIFICATIONS.updated);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteModel = async (id: string) => {
    console.log('test delete', id);
  };

  const handleGetModel = (id: string) => {
    if (!id) return;
    setModelImg(null);
    setLocalPreviewUrl(null);
    setEditingId(id);
  };
  const handleResetId = () => {
    setEditingId(null);
  };

  const handleSetImg = (file: File) => {
    if (!file) return;

    setModelImg(file);
    const url = URL.createObjectURL(file);
    setLocalPreviewUrl(url);

    return false; // запрешаем автоматически отправлять файл после выбора через проводник
  };
  const handleReset = () => {
    setModelImg(null);
    setLocalPreviewUrl(null);
    setEditingId(null);
  };
  const handleResetFilter = () => {};

  return {
    page,
    limit,
    previewUrl,
    mode,
    models,
    editingModel,
    manufacturersOptions,
    typesOptions,
    modelsFetching,
    modelsLoading,
    onPreview: handleSetImg,
    onSave: handleSubmit,
    onEdit: handleGetModel,
    onDelete: handleDeleteModel,
    resetId: handleResetId,
    onReset: handleReset,
    onResetFilter: handleResetFilter,
  };
};
