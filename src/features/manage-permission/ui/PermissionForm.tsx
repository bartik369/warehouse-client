import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Typography } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';

import { Permission } from '@/entities/permission/model/types';
import { FormMode } from '@/shared/types/form';
import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { RhfTextareaField } from '@/shared/ui/form-fields/RhfTextareaField';
import { LABELS } from '@/utils/constants/ui/labels';

import { TITLE } from '../model/constants';
import { PermissionFormValues, permissionSchema } from '../model/schema';

interface PermissionFormProps {
  data?: Permission;
  mode: FormMode;
  resetId: () => void;
  onSave: (data: PermissionFormValues) => Promise<void>;
}

export const PermissionForm = ({ data, mode, onSave, resetId }: PermissionFormProps) => {
  const defaultValues = {
    name: '',
    comment: '',
    disabled: false,
  };
  const form = useForm<PermissionFormValues>({
    resolver: zodResolver(permissionSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = form;

  const onSubmit = async (formData: PermissionFormValues) => {
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
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  return (
    <FormProvider {...form}>
      <ActionsPanel size="large" onApply={submit} onReset={handleClear}>
        <form onSubmit={submit}>
          <Flex vertical gap={24}>
            <Typography.Title level={3}>{TITLE}</Typography.Title>
            <Flex vertical gap={10}>
              <RhfTextField<PermissionFormValues> name="name" label={LABELS.name} />
              <RhfTextareaField<PermissionFormValues> name="comment" label={LABELS.description} />
            </Flex>
          </Flex>
        </form>
      </ActionsPanel>
    </FormProvider>
  );
};
