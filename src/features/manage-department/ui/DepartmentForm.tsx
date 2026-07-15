import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Typography } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';

import { Department } from '@/entities/department/model/types';
import { FormMode } from '@/shared/types/form';
import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { RhfTextareaField } from '@/shared/ui/form-fields/RhfTextareaField';
import { FIELD_TOOLTIPS } from '@/shared/ui/text-field/constants';
import { LABELS } from '@/utils/constants/ui/labels';

import { TITLE } from '../model/constants';
import { DepartmentFormValues, departmentSchema } from '../model/schema';

interface DepartmentFormProps {
  data?: Department;
  mode: FormMode;
  resetId: () => void;
  onSave: (data: DepartmentFormValues) => Promise<void>;
}

export const DepartmentForm = ({ data, mode, onSave, resetId }: DepartmentFormProps) => {
  const defaultValues: DepartmentFormValues = {
    name: '',
    slug: '',
    comment: '',
  };
  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = form;
  const onSubmit = async (formData: DepartmentFormValues) => {
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
      <ActionsPanel size="large" onApply={submit} onReset={handleClear} mode={mode}>
        <form onSubmit={submit}>
          <Flex vertical gap={24}>
            <Typography.Title level={3}>{TITLE}</Typography.Title>
            <Flex vertical gap={10}>
              <RhfTextField<DepartmentFormValues> name="name" label={LABELS.name} />
              <RhfTextField<DepartmentFormValues>
                name="slug"
                tooltip={FIELD_TOOLTIPS.slug}
                label={LABELS.name}
              />
              <RhfTextareaField<DepartmentFormValues> name="comment" label={LABELS.description} />
            </Flex>
          </Flex>
        </form>
      </ActionsPanel>
    </FormProvider>
  );
};
