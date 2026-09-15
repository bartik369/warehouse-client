import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Flex } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';

import { Model } from '@/entities/model/model/types';
import { PATHS } from '@/shared/api/paths';
import { FormMode } from '@/shared/types/form';
import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { RhfTextareaField } from '@/shared/ui/form-fields/RhfTextareaField';
import { FIELD_TOOLTIPS } from '@/shared/ui/text-field/constants';
import { LABELS } from '@/utils/constants/ui/labels';

import { TITLE } from '../../model/constants';
import { ModelFormValues, modelSchema } from '../../model/schema';
import { Picture } from '../../picture/Picture';
import styles from './ModelForm.module.scss';

interface ModelFormProps {
  previewUrl: string | null;
  data?: Model;
  mode: FormMode;
  resetId: () => void;
  onSave: (data: ModelFormValues) => Promise<void>;
  onPreview: (file: File) => void;
  onReset: () => void;
}

export const ModelForm = ({
  previewUrl,
  data,
  mode,
  onSave,
  resetId,
  onPreview,
  onReset,
}: ModelFormProps) => {
  const defaultValues: ModelFormValues = {
    name: '',
    slug: '',
    comment: '',
  };
  const form = useForm<ModelFormValues>({
    resolver: zodResolver(modelSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = form;
  const onSubmit = async (formData: ModelFormValues) => {
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
    onReset();
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  return (
    <FormProvider {...form}>
      <Card>
        <ActionsPanel size="large" onApply={submit} onReset={handleClear} mode={mode}>
          <form onSubmit={submit}>
            <Flex gap={24} vertical>
              <Flex gap={15} wrap>
                <Picture previewUrl={previewUrl} onPreview={onPreview} />
                <Flex vertical gap={10} flex="1 0 auto">
                  <RhfTextField<ModelFormValues> name="name" label={LABELS.name} />
                  <RhfTextField<ModelFormValues>
                    name="slug"
                    tooltip={FIELD_TOOLTIPS.slug}
                    label={LABELS.slug}
                  />
                  <RhfTextareaField<ModelFormValues> name="comment" label={LABELS.description} />
                </Flex>
              </Flex>
            </Flex>
          </form>
        </ActionsPanel>
      </Card>
    </FormProvider>
  );
};
