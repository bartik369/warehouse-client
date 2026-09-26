import { useState } from 'react';

import { useQueryParams } from '@/shared/hooks/useQueryParams';
import { useDebounce } from '@/shared/lib/debounce/useDebounce';
import { FormMode } from '@/shared/types/form';
import { useGetDepartmentsQuery } from '@/store/api/departmentApi';
import { useGetLocationsQuery } from '@/store/api/locationApi';
import { useGetUserQuery } from '@/store/api/userApi';

import { UserFilterState } from './types';

export const useManageUser = () => {
  const { data: locations = [], isLoading: locationsLoading } = useGetLocationsQuery();
  const { data: departments = [], isLoading: departmentsLoading } = useGetDepartmentsQuery();
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialState: UserFilterState = {
    search: '',
  };
  const mode: FormMode = editingId ? 'update' : 'create';
  const [filters, setFilters] = useState(initialState);
  const { updateSearchParam, updateSearchParams, resetSearchParams } = useQueryParams();
  const { data: user } = useGetUserQuery(editingId, {
    skip: !editingId,
  });

  const debouncesSearch = useDebounce(filters.search, 500);

  const queryFilters = {
    ...filters,
    search: debouncesSearch,
  };

  const locationsOptions = locations.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const departmentsOptions = departments.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const handleEditUser = (id: string) => {
    setEditingId(id);
  };

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
    updateSearchParam('search', value);
  };

  return {
    user,
    filters,
    queryFilters,
    mode,
    locationsOptions,
    departmentsOptions,
    locationsLoading,
    departmentsLoading,
    onSearch: handleSearchChange,
    onEdit: handleEditUser,
  };
};
