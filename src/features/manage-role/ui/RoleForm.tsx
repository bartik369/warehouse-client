import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Typography } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';

import { Role } from '@/entities/role/model/types';
import { FormMode } from '@/shared/types/form';
import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { RhfTextareaField } from '@/shared/ui/form-fields/RhfTextareaField';
import { LABELS } from '@/utils/constants/ui/labels';

import { TITLE } from '../model/constants';
import { RoleFormValues, roleSchema } from '../model/schema';

interface RoleFormProps {
  data?: Role;
  mode: FormMode;
  resetId: () => void;
  onSave: (data: RoleFormValues) => Promise<void>;
}

export const RoleForm = ({ data, mode, onSave, resetId }: RoleFormProps) => {
  const defaultValues = {
    name: '',
    comment: '',
  };
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = form;

  const onSubmit = async (formData: RoleFormValues) => {
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
      <ActionsPanel size="large" mode={mode} onApply={submit} onReset={handleClear}>
        <form onSubmit={submit}>
          <Flex vertical gap={24}>
            <Typography.Title level={3}>{TITLE}</Typography.Title>
            <Flex vertical gap={10}>
              <RhfTextField<RoleFormValues> name="name" label={LABELS.name} />
              <RhfTextareaField<RoleFormValues> name="comment" label={LABELS.description} />
            </Flex>
          </Flex>
        </form>
      </ActionsPanel>
    </FormProvider>
  );
};
