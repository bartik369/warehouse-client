import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Col, Row, SelectProps } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';

import { User } from '@/entities/user/model/types';
import { FormMode } from '@/shared/types/form';
import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfSwitchField } from '@/shared/ui/form-fields/RghSwitchField';
import { RhfSelectField } from '@/shared/ui/form-fields/RhfSelectField';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';

import { CreateUserFormValues, createUserSchema } from '../../model/schema';
import { FormFieldConfig } from '../../model/types';
import styles from './UserForm.module.scss';

interface UserFormProps {
  user?: User;
  mode: FormMode;
  departmentsOptions: SelectProps['options'];
  locationsOptions: SelectProps['options'];
  fields: FormFieldConfig<CreateUserFormValues>[];
  locationsLoading: boolean;
  departmentsLoading: boolean;
}

export const UserForm = ({
  user,
  mode,
  departmentsOptions,
  locationsOptions,
  fields,
  locationsLoading,
  departmentsLoading,
}: UserFormProps) => {
  const form = useForm({
    resolver: zodResolver(createUserSchema),
  });
  const { reset } = form;

  const dataSources = { departments: departmentsOptions, locations: locationsOptions };

  const handleReset = () => {
    console.log('reset');
  };

  const onSubmit = () => {
    console.log('ok');
  };

  useEffect(() => {
    if (!user) return;
    reset(user);
  }, [user, reset]);

  return (
    <ActionsPanel onApply={onSubmit} onReset={handleReset} size="large" mode={mode}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Row gutter={[16, 16]}>
            {fields.map((field) => (
              <Col key={field.name} {...field.col}>
                {field.type === 'input' && (
                  <RhfTextField<CreateUserFormValues>
                    name={field.name}
                    label={field.label}
                    prefix={field.prefix}
                  />
                )}
                {field.type === 'select' && (
                  <RhfSelectField<CreateUserFormValues>
                    name={field.name}
                    label={field.label}
                    options={dataSources[field.itemsKey]}
                  />
                )}
                {field.type === 'switch' && (
                  <RhfSwitchField<CreateUserFormValues> name="isActive" />
                )}
              </Col>
            ))}
          </Row>
        </form>
      </FormProvider>
    </ActionsPanel>
  );
};
