import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Typography } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { LuKeyRound } from 'react-icons/lu';

import { PermissionRole } from '@/entities/permission-role/model/types';
import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfRoleAssignmentSelect } from '@/shared/ui/form-fields/RhfRoleAssignmentSelect';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { LABELS } from '@/utils/constants/ui/labels';

import { TITLE } from '../model/constants';
import { AccessFromValues, accessSchema } from '../model/schema';

interface AccessFormProps {
  roles: PermissionRole[];
  onSave: (data: AccessFromValues) => Promise<void>;
}
export const AccessForm = ({ onSave, roles }: AccessFormProps) => {
  const defaultValues = {
    email: '',
    id: [],
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
              <RhfTextField<AccessFromValues>
                prefix={<HiOutlineEnvelope size={16} />}
                name="email"
                label={LABELS.email}
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
