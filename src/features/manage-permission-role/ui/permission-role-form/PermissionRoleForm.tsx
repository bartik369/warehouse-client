import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Typography } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';

import type { Location } from '@/entities/location/model/types';
import { PermissionRole, UserRolesList } from '@/entities/permission-role/model/types';
import { Permission } from '@/entities/permission/model/types';
import { Role } from '@/entities/role/model/types';
import { Warehouse } from '@/entities/warehouse/model/types';
import { FormMode, SelectOption } from '@/shared/types/form';
import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfPermissionsSelect } from '@/shared/ui/form-fields/RhfPermissionsSelect';
import { RhfSelectField } from '@/shared/ui/form-fields/RhfSelectField';
import { CheckedPermissionOptions } from '@/types/content';
import { LABELS } from '@/utils/constants/ui/labels';

import { TITLE } from '../../model/constants';
import { PermissionRoleFormValues, permissionRoleSchema } from '../../model/schema';

interface PermissionRoleFormProps {
  roles: Role[];
  locations: Location[];
  selectedRole: PermissionRole | null;
  warehouseOptions: SelectOption[];
  roleOptions: SelectOption[];
  locationOptions: SelectOption[];
  permissionOptions?: SelectOption[]; // удалить?
  permissions: Permission[];
  permissionRoles: PermissionRole[];
  mode: FormMode;
  resetId: () => void;
  onSave: (data: PermissionRoleFormValues) => Promise<void>;
}

export const PermissionRoleForm = ({
  roles,
  locations,
  permissions,
  selectedRole,
  warehouseOptions,
  roleOptions,
  locationOptions,
  mode,
  onSave,
  resetId,
}: PermissionRoleFormProps) => {
  const defaultValues = {
    roleId: '',
    permissionIds: [], // todo может null
    locationId: '',
    comment: '',
  };
  const form = useForm<PermissionRoleFormValues>({
    resolver: zodResolver(permissionRoleSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = form;
  const onSubmit = async (formData: PermissionRoleFormValues) => {
    try {
      await onSave(formData);
      handleClear();
    } catch (error) {
      console.log(error);
    }
  };
  const submit = handleSubmit(onSubmit);
  const handleClear = () => {
    reset(defaultValues);
    resetId();
  };

  useEffect(() => {
    if (selectedRole) {
      reset(selectedRole);
    }
  }, [selectedRole, reset]);

  return (
    <FormProvider {...form}>
      <ActionsPanel size="large" mode={mode} onApply={submit} onReset={handleClear}>
        <form onSubmit={submit}>
          <Flex vertical gap={24}>
            <Typography.Title level={3}>{TITLE}</Typography.Title>
            <Flex vertical gap={10}>
              <RhfSelectField<PermissionRoleFormValues>
                name="roleId"
                options={roleOptions}
                label={LABELS.role}
              />
              <RhfSelectField<PermissionRoleFormValues>
                name="warehouseId"
                options={warehouseOptions}
                label={LABELS.warehouse}
              />
              <RhfSelectField<PermissionRoleFormValues>
                name="locationId"
                options={locationOptions}
                label={LABELS.location}
              />
              <RhfPermissionsSelect<PermissionRoleFormValues>
                name="permissionIds"
                label="Разрешения"
                permissions={permissions}
              />
            </Flex>
          </Flex>
        </form>
      </ActionsPanel>
    </FormProvider>
  );
};
