import { useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Typography } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';

import { Location } from '@/entities/location/model/types';
import { FormMode } from '@/shared/types/form';
import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfSelectField } from '@/shared/ui/form-fields/RhfSelectField';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { RhfTextareaField } from '@/shared/ui/form-fields/RhfTextareaField';
import { FIELD_TOOLTIPS } from '@/shared/ui/text-field/constants';
import { LABELS } from '@/utils/constants/ui/labels';

import { TITLE } from '../model/constants';
import { WarehouseFormValues, warehouseSchema } from '../model/schema';
import { Warehouse } from '../model/type';

interface WarehouseFormProps {
  data?: Warehouse;
  locations: Location[];
  mode: FormMode;
  resetId: () => void;
  onSave: (data: WarehouseFormValues) => Promise<void>;
}
export const WarehouseForm = ({ data, locations, mode, resetId, onSave }: WarehouseFormProps) => {
  const defaultValues = {
    name: '',
    slug: '',
    locationId: '',
    comment: '',
  };

  const form = useForm<WarehouseFormValues>({
    resolver: zodResolver(warehouseSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = form;

  const onSubmit = async (formData: WarehouseFormValues) => {
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

  const locationOptions = useMemo(
    () =>
      locations.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    [locations]
  );

  return (
    <FormProvider {...form}>
      <ActionsPanel size="large" onReset={handleClear} onApply={submit} mode={mode}>
        <form onSubmit={submit}>
          <Flex vertical gap={24}>
            <Typography.Title level={3}>{TITLE}</Typography.Title>
            <Flex vertical gap={10}>
              <RhfTextField<WarehouseFormValues> name="name" label={LABELS.name} />
              <RhfTextField<WarehouseFormValues>
                name="slug"
                label={LABELS.slug}
                tooltip={FIELD_TOOLTIPS.slug}
              />
              <RhfSelectField<WarehouseFormValues>
                name="locationId"
                options={locationOptions}
                label={LABELS.location}
              />
              <RhfTextareaField<WarehouseFormValues> name="comment" label={LABELS.description} />
            </Flex>
          </Flex>
        </form>
      </ActionsPanel>
    </FormProvider>
  );
};
