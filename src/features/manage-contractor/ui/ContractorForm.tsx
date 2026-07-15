import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Typography } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';

import { Contractor } from '@/entities/contractor/model/types';
import { FormMode } from '@/shared/types/form';
import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfPhoneField } from '@/shared/ui/form-fields/RhfPhoneField';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { RhfTextareaField } from '@/shared/ui/form-fields/RhfTextareaField';
import { FIELD_TOOLTIPS } from '@/shared/ui/text-field/constants';
import { LABELS } from '@/utils/constants/ui/labels';

import { TITLE } from '../model/constants';
import { ContractorFormValues, contractorSchema } from '../model/schema';

interface ContractorFormProps {
  data?: Contractor;
  mode: FormMode;
  resetId: () => void;
  onSave: (data: ContractorFormValues) => Promise<void>;
}

export const ContractorForm = ({ data, mode, onSave, resetId }: ContractorFormProps) => {
  const defaultValues = {
    name: '',
    slug: '',
    phoneNumber: '',
    address: '',
  };
  const form = useForm<ContractorFormValues>({
    resolver: zodResolver(contractorSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = form;

  const onSubmit = async (formData: ContractorFormValues) => {
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

  console.log(form.getValues());

  return (
    <FormProvider {...form}>
      <ActionsPanel size="large" mode={mode} onApply={submit} onReset={handleClear}>
        <form onSubmit={submit}>
          <Flex vertical gap={24}>
            <Typography.Title level={3}>{TITLE}</Typography.Title>
            <Flex vertical gap={10}>
              <RhfTextField<ContractorFormValues> name="name" label={LABELS.name} />
              <RhfTextField<ContractorFormValues>
                name="slug"
                tooltip={FIELD_TOOLTIPS.slug}
                label={LABELS.slug}
              />
              <RhfPhoneField<ContractorFormValues> name="phoneNumber" />
              <RhfTextareaField<ContractorFormValues> name="address" label={LABELS.address} />
            </Flex>
          </Flex>
        </form>
      </ActionsPanel>
    </FormProvider>
  );
};
