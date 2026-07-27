import { useMemo, useState } from 'react';

import { skipToken } from '@reduxjs/toolkit/query';

import { User } from '@/entities/ user/model/types';
import { useDebounce } from '@/shared/lib/debounce/useDebounce';
import { UserAutocompleteItem } from '@/shared/ui/user-autocomplete/UserAutocompleteItem';
import { UserAutocompleteOption } from '@/shared/ui/user-autocomplete/types';
import { useGetPermissionsRolesQuery } from '@/store/api/permissionApi';
import { useGetUserRolesQuery } from '@/store/api/rolesApi';
import { useGetFilteredUsersQuery } from '@/store/api/userApi';

import { AccessFromValues } from './schema';

export const useManageAccess = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: permissionRoles = [] } = useGetPermissionsRolesQuery();
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue.trim(), 400);
  const { data: users = [], isLoading: userListLoading } = useGetFilteredUsersQuery(
    debouncedSearchValue,
    {
      skip: debouncedSearchValue.length < 2,
    }
  );
  const {
    data: userRoles,
    isLoading: rolesLoading,
    isSuccess,
  } = useGetUserRolesQuery(selectedUser?.id ?? skipToken);
  const wasSearched = debouncedSearchValue.length > 2;

  const userListOptions = useMemo<UserAutocompleteOption[]>(
    () =>
      wasSearched
        ? users.map((user) => ({
            value: user.email,
            label: <UserAutocompleteItem key={user.id} user={user} />,
          }))
        : [],
    [users, wasSearched]
  );

  const handleSubmit = async (data: AccessFromValues) => {};
  const handleUserSearch = (value: string) => {
    setSearchValue(value);
  };
  const handleUserInfo = (value: string, option: UserAutocompleteOption) => {
    if (!option?.label?.props?.user) return;
    setSelectedUser(option.label.props.user);
  };
  const handleUserClear = () => {
    setSelectedUser(null);
    setSearchValue('');
  };

  return {
    users,
    selectedUser,
    roles: permissionRoles,
    userRoles,
    isSuccess,
    userListOptions,
    userListLoading,
    rolesLoading,
    wasSearched,
    setSearchValue,
    onSave: handleSubmit,
    onSelect: handleUserInfo,
    onUserSearch: handleUserSearch,
    onUserClear: handleUserClear,
  };
};
