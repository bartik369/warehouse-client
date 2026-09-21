import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Typography } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';

import { DeviceType } from '@/entities/type/model/types';
import { FormMode } from '@/shared/types/form';
import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { FIELD_TOOLTIPS } from '@/shared/ui/text-field/constants';
import { LABELS } from '@/utils/constants/ui/labels';

import { TITLE } from '../model/constants';
import { TypeFormValues, typeSchema } from '../model/schema';

interface TypeFormProps {
  data?: DeviceType;
  mode: FormMode;
  resetId: () => void;
  onSave: (data: TypeFormValues) => Promise<void>;
}

export const TypeForm = ({ data, mode, onSave, resetId }: TypeFormProps) => {
  const defaultValues: TypeFormValues = {
    name: '',
    slug: '',
  };
  const form = useForm<TypeFormValues>({
    resolver: zodResolver(typeSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = form;
  const onSubmit = async (formData: TypeFormValues) => {
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
              <RhfTextField<TypeFormValues> name="name" label={LABELS.name} />
              <RhfTextField<TypeFormValues>
                name="slug"
                tooltip={FIELD_TOOLTIPS.slug}
                label={LABELS.slug}
              />
            </Flex>
          </Flex>
        </form>
      </ActionsPanel>
    </FormProvider>
  );
};
