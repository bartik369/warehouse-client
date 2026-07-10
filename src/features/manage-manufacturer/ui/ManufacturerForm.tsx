import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Typography } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';

import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { RhfTextareaField } from '@/shared/ui/form-fields/RhfTextareaField';
import { FIELD_TOOLTIPS } from '@/shared/ui/text-field/constants';
import { LABELS } from '@/utils/constants/ui/labels';

import { TITLE } from '../model/constants';
import { ManufacturerFormValues, manufacturerSchema } from '../model/schema';
import { FormMode, Manufacturer } from '../model/types';

interface ManufacturerFormProps {
  data?: Manufacturer;
  mode: FormMode;
  resetId: () => void;
  onSave: (data: ManufacturerFormValues) => Promise<void>;
}

export const ManufacturerForm = ({ data, mode, onSave, resetId }: ManufacturerFormProps) => {
  const defaultValues: ManufacturerFormValues = {
    name: '',
    slug: '',
    comment: '',
  };
  const form = useForm<ManufacturerFormValues>({
    resolver: zodResolver(manufacturerSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = form;

  const onSubmit = async (formData: ManufacturerFormValues) => {
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
      <ActionsPanel size="large" onReset={handleClear} onApply={submit} mode={mode}>
        <form onSubmit={submit}>
          <Flex vertical gap={24}>
            <Typography.Title level={3}>{TITLE}</Typography.Title>
            <Flex vertical gap={10}>
              <RhfTextField<ManufacturerFormValues> name="name" label={LABELS.name} />
              <RhfTextField<ManufacturerFormValues>
                name="slug"
                tooltip={FIELD_TOOLTIPS.slug}
                label={LABELS.slug}
              />
              <RhfTextareaField<ManufacturerFormValues> name="comment" label={LABELS.description} />
            </Flex>
          </Flex>
        </form>
      </ActionsPanel>
    </FormProvider>
  );
};
