import { zodResolver } from '@hookform/resolvers/zod';
import { AutoCompleteProps, Flex, Typography } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { LuKeyRound } from 'react-icons/lu';

import { PermissionRole } from '@/entities/permission-role/model/types';
import { SelectOption } from '@/shared/types/form';
import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfRoleAssignmentSelect } from '@/shared/ui/form-fields/RhfRoleAssignmentSelect';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { RhfUserAutocomplete } from '@/shared/ui/form-fields/RhfUserAutocomplete';
import { UserAutocompleteOption } from '@/shared/ui/user-autocomplete/types';
import { LABELS } from '@/utils/constants/ui/labels';

import { TITLE } from '../../model/constants';
import { AccessFromValues, accessSchema } from '../../model/schema';

interface AccessFormProps {
  roles: PermissionRole[];
  userListOptions: UserAutocompleteOption[];
  loading?: boolean;
  searched?: boolean;
  onSave: (data: AccessFromValues) => Promise<void>;
  onOptionSelect?: (value: string, option: UserAutocompleteOption) => void;
  onUserSearch: (value: string) => void;
}
export const AccessForm = ({
  roles,
  userListOptions,
  loading,
  searched,
  onUserSearch,
  onOptionSelect,
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
  const { reset, handleSubmit } = form;

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
    // resetId();
  };

  const submit = handleSubmit(onSubmit);

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
