import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Typography } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';

import { Location } from '@/entities/location/model/type';
import { FormMode } from '@/shared/types/form';
import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { RhfTextareaField } from '@/shared/ui/form-fields/RhfTextareaField';
import { FIELD_TOOLTIPS } from '@/shared/ui/text-field/constants';
import { LABELS } from '@/utils/constants/ui/labels';

import { TITLE } from '../model/constants';
import { LocationFormValues, locationSchema } from '../model/schema';

interface LocationFormProps {
  data?: Location;
  mode: FormMode;
  resetId: () => void;
  onSave: (data: LocationFormValues) => Promise<void>;
}
export const LocationForm = ({ data, mode, onSave, resetId }: LocationFormProps) => {
  const defaultValues = {
    name: '',
    slug: '',
    comment: '',
  };
  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = form;
  const onSubmit = async (formData: LocationFormValues) => {
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
      <ActionsPanel size="large" mode={mode} onReset={handleClear} onApply={submit}>
        <form onSubmit={submit}>
          <Flex vertical gap={24}>
            <Typography.Title level={3}>{TITLE}</Typography.Title>
            <Flex vertical gap={10}>
              <RhfTextField<LocationFormValues> name="name" label={LABELS.name} />
              <RhfTextField<LocationFormValues>
                name="slug"
                tooltip={FIELD_TOOLTIPS.slug}
                label={LABELS.slug}
              />
              <RhfTextareaField<LocationFormValues> name="comment" label={LABELS.description} />
            </Flex>
          </Flex>
        </form>
      </ActionsPanel>
    </FormProvider>
  );
};
