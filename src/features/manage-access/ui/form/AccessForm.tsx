import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Typography } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { LuKeyRound } from 'react-icons/lu';

import { User } from '@/entities/ user/model/types';
import { createRoleScopeKey } from '@/entities/permission-role/lib/create-role-scope-key';
import { PermissionRole } from '@/entities/permission-role/model/types';
import { UserRoleAssignment } from '@/entities/role/model/types';
import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfRoleAssignmentSelect } from '@/shared/ui/form-fields/RhfRoleAssignmentSelect';
import { RhfUserAutocomplete } from '@/shared/ui/form-fields/RhfUserAutocomplete';
import { UserAutocompleteOption } from '@/shared/ui/user-autocomplete/types';
import { LABELS } from '@/utils/constants/ui/labels';

import { TITLE } from '../../model/constants';
import { AccessFromValues, accessSchema } from '../../model/schema';

interface AccessFormProps {
  selectedUser: User | null;
  roles: PermissionRole[];
  userRoles?: UserRoleAssignment[];
  userListOptions: UserAutocompleteOption[];
  loading?: boolean;
  searched?: boolean;
  onSave: (data: AccessFromValues) => Promise<void>;
  onOptionSelect?: (value: string, option: UserAutocompleteOption) => void;
  onUserSearch: (value: string) => void;
  onUserClear: () => void;
}
export const AccessForm = ({
  selectedUser,
  roles,
  userRoles,
  userListOptions,
  loading,
  searched,
  onUserSearch,
  onOptionSelect,
  onUserClear,
  onSave,
}: AccessFormProps) => {
  const defaultValues = {
    userId: '',
    permissionRoleIds: [],
  };
  const form = useForm<AccessFromValues>({
    resolver: zodResolver(accessSchema),
    defaultValues,
  });
  const { reset, handleSubmit, setValue } = form;

  const onSubmit = async (formData: AccessFromValues) => {
    try {
      await onSave(formData);
      handleClear();
    } catch (error) {
      console.log(error);
    }
  };
  const handleClear = () => {
    reset(defaultValues);
    onUserClear();
  };

  const submit = handleSubmit(onSubmit);

  useEffect(() => {
    if (userRoles && userRoles.length > 0 && selectedUser) {
      const res = userRoles.map((item) => createRoleScopeKey(item));
      setValue('permissionRoleIds', res);
    }
  }, [userRoles, selectedUser]);

  return (
    <FormProvider {...form}>
      <ActionsPanel size="large" onApply={submit} onReset={handleClear}>
        <form onSubmit={submit}>
          <Flex vertical gap={24}>
            <Typography.Title level={3}>{TITLE}</Typography.Title>
            <Flex vertical gap={10}>
              <RhfUserAutocomplete<AccessFromValues>
                prefix={<HiOutlineEnvelope size={16} />}
                name="userId"
                label={LABELS.name}
                options={userListOptions}
                loading={loading}
                searched={searched}
                onSearch={onUserSearch}
                onClear={handleClear}
                onOptionSelect={onOptionSelect}
              />
              <RhfRoleAssignmentSelect<AccessFromValues>
                prefix={<LuKeyRound />}
                name="permissionRoleIds"
                roles={roles}
                label={LABELS.role}
              />
            </Flex>
          </Flex>
        </form>
      </ActionsPanel>
    </FormProvider>
  );
};
