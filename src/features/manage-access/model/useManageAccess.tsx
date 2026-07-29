import { useMemo, useState } from 'react';

import { skipToken } from '@reduxjs/toolkit/query';

import { User } from '@/entities/ user/model/types';
import { GrantUserRole } from '@/entities/role/model/types';
import { useDebounce } from '@/shared/lib/debounce/useDebounce';
import { FormMode } from '@/shared/types/form';
import { UserAutocompleteItem } from '@/shared/ui/user-autocomplete/UserAutocompleteItem';
import { UserAutocompleteOption } from '@/shared/ui/user-autocomplete/types';
import { useGetPermissionsRolesQuery } from '@/store/api/permissionApi';
import {
  useGetUserRolesQuery,
  useGrantRoleMutation,
  useRevokeRoleMutation,
} from '@/store/api/rolesApi';
import { useGetFilteredUsersQuery } from '@/store/api/userApi';

export const useManageAccess = () => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: permissionRoles = [] } = useGetPermissionsRolesQuery();
  const [revokeRole, { isLoading: isRevokeLoading }] = useRevokeRoleMutation();
  const [grantRoles, { isLoading: isGrantLoading }] = useGrantRoleMutation();
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
  const wasSearched = debouncedSearchValue.length >= 2;
  const mode: FormMode =
    selectedUser && userRoles && userRoles.roles?.length > 0 ? 'update' : 'create';

  const userListOptions = useMemo<UserAutocompleteOption[]>(
    () =>
      wasSearched
        ? users.map((user) => ({
            value: user.email,
            label: <UserAutocompleteItem key={user.id} user={user} />,
            user,
          }))
        : [],
    [users, wasSearched]
  );

  const handleUserSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleUserInfo = (_value: string, option: UserAutocompleteOption) => {
    setSelectedUser(option.user);
  };

  const handleUserClear = () => {
    setSelectedUser(null);
    setSearchValue('');
  };

  const handleDeleteRole = (assignmentId: string) => {
    setDeletingId(assignmentId);
    revokeRole({
      assignmentId,
      userId: selectedUser?.id,
    });
  };

  const handleSubmit = async (data: GrantUserRole) => {
    try {
      await grantRoles(data).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    mode,
    users,
    selectedUser,
    roles: permissionRoles,
    userRoles,
    deletingId,
    isSuccess,
    userListOptions,
    userListLoading,
    isGrantLoading,
    isRevokeLoading,
    rolesLoading,
    wasSearched,
    setSearchValue,
    onSave: handleSubmit,
    onSelect: handleUserInfo,
    onUserSearch: handleUserSearch,
    onUserClear: handleUserClear,
    onDelete: handleDeleteRole,
  };
};
