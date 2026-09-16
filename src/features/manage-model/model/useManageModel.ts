import { useState } from 'react';

import { Manufacturer } from '@/entities/manufacturer/model/types';
import { DeviceType } from '@/entities/type/model/types';
import { PATHS } from '@/shared/api/paths';
import { useQueryParams } from '@/shared/hooks/useQueryParams';
import { useDebounce } from '@/shared/lib/debounce/useDebounce';
import { appToast } from '@/shared/lib/toast/toast';
import { FormMode } from '@/shared/types/form';
import { useGetManufacturersQuery } from '@/store/api/manufacturersApi';
import {
  useCreateModelMutation,
  useGetModelQuery,
  useUpdateModelMutation,
} from '@/store/api/modelsApi';
import { useGetTypesQuery } from '@/store/api/typesApi';

import { NOTIFICATIONS } from './constants';
import { ModelFormValues } from './schema';
import { ModelFilterState } from './types';

export const useManageModel = () => {
  const { data: manufacturers = [] } = useGetManufacturersQuery();
  const { data: types = [] } = useGetTypesQuery();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modelImg, setModelImg] = useState<File | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const { data: editingModel } = useGetModelQuery(editingId!, {
    skip: !editingId,
  });
  const [createModel] = useCreateModelMutation();
  const [updateModel] = useUpdateModelMutation();

  const initialFilters: ModelFilterState = {
    manufacturerIds: null,
    typeIds: null,
    search: '',
  };

  const [filters, setFilters] = useState(initialFilters);
  const { updateSearchParam, updateSearchParams, resetSearchParams } = useQueryParams();

  const debouncedSearch = useDebounce(filters.search, 500);
  const queryFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const manufacturersOptions = manufacturers.map((item: Manufacturer) => ({
    value: item.id,
    label: item.name,
  }));

  const typesOptions = types.map((item: DeviceType) => ({
    value: item.id,
    label: item.name,
  }));
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

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  };

  const handleManufacturerChange = (value: string[]) => {
    setFilters((prev) => ({
      ...prev,
      manufacturerIds: value,
    }));
    updateSearchParam('manufacturerIds', value);
  };

  const handleTypeChange = (value: string[]) => {
    setFilters((prev) => ({
      ...prev,
      typeIds: value,
    }));
    updateSearchParam('typeIds', value);
  };

  return {
    filters: queryFilters,
    previewUrl,
    mode,
    editingModel,
    manufacturersOptions,
    typesOptions,
    onPreview: handleSetImg,
    onSave: handleSubmit,
    onEdit: handleGetModel,
    onDelete: handleDeleteModel,
    resetId: handleResetId,
    onReset: handleReset,
    onResetFilter: handleResetFilter,
    onSearch: handleSearchChange,
    handleManufacturerChange,
    handleTypeChange,
  };
};
