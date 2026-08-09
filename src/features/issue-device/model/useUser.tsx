import { useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/redux/useRedux';
import { useDebounce } from '@/shared/lib/debounce/useDebounce';
import {
  UserAutocompleteOption,
  UserAutocompleteOptions,
} from '@/shared/ui/user-autocomplete/types';
import { useGetDepartmentsQuery } from '@/store/api/departmentApi';
import { useGetLocationsQuery } from '@/store/api/locationApi';
import { useGetFilteredUsersQuery } from '@/store/api/userApi';
import { resetUser, setUser } from '@/store/slices/userSlice';
import { RootState } from '@/store/store';

import { UserOption } from '../ui/user-option/UserOption';

export const useUser = () => {
  const currentUser = useAppSelector((state: RootState) => state.user.user);
  const [userQuery, setUserQuery] = useState('');
  const debounceSearchValue = useDebounce(userQuery.trim(), 700);
  const {
    data: filteredUsers = [],
    isLoading,
    isSuccess,
    isFetching,
  } = useGetFilteredUsersQuery(debounceSearchValue, {
    skip: debounceSearchValue.length < 2 || currentUser?.email === debounceSearchValue,
  });
  const { data: departments = [] } = useGetDepartmentsQuery();
  const { data: locations = [] } = useGetLocationsQuery();
  const wasSearched = debounceSearchValue.length >= 2;
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    setUserQuery(value);

    if (currentUser && value !== currentUser.email) {
      dispatch(resetUser());
      // setUser(null);
    }
  };
  const handleSelect = (_value: string, option: UserAutocompleteOption) => {
    dispatch(setUser(option.user));
    setUserQuery(option.user.email);
  };
  const handleReset = () => {
    dispatch(resetUser());
    setUserQuery('');
  };

  const userOptions = useMemo<UserAutocompleteOptions>(
    () =>
      filteredUsers.map((user) => {
        const enrichedUser = {
          ...user,
          location:
            locations.find((location) => location.id === user.locationId)?.name ??
            'Локация не указана',
          department:
            departments.find((department) => department.id === user.departmentId)?.name ??
            'Отдел не указан',
        };

        return {
          value: user.email,
          label: <UserOption user={enrichedUser} />,
          user: enrichedUser,
        };
      }),
    [filteredUsers, departments]
  );

  return {
    currentUser,
    users: filteredUsers,
    userOptions,
    userQuery,
    wasSearched,
    isLoading,
    isSuccess,
    isFetching,
    handleChange,
    handleSelect,
    handleReset,
  };
};
