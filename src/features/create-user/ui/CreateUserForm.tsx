import { memo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Col, Row } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';

import Toggle from '@/components/ui/checkbox/Toggle';
import Input from '@/components/ui/input/Input';
import Select from '@/components/ui/select/Select';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { ActionsPanel } from '@/shared/ui/action-panel/ActionsPanel';
import { RhfSwitchField } from '@/shared/ui/form-fields/RgfSwitchField';
import { RhfSelectField } from '@/shared/ui/form-fields/RhfSelectField';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { RootState } from '@/store/store';
import { FieldUserFormConfig } from '@/types/content';
import { Entity } from '@/types/devices';
import { User, UserFormActions } from '@/types/user';
import { LABELS } from '@/utils/constants/ui/labels';
import { SECTION_TITLES } from '@/utils/constants/ui/titles';

import Actions from '../../../components/forms/device/Actions';
import { mapEntityToOptions } from '../model/mapEntityToOptions';
import { CreateUserFormValues, createUserSchema } from '../model/schema';
import { FormFieldConfig } from '../model/types';
import styles from './CreateUserForm.module.scss';

interface CreateUserFormProps {
  actions: UserFormActions;
  departments: Entity[];
  locations: Entity[];
  fields: FormFieldConfig<CreateUserFormValues>[];
}

export const CreateUserForm = memo(
  ({ departments, locations, fields, actions }: CreateUserFormProps) => {
    const form = useForm({
      resolver: zodResolver(createUserSchema),
    });

    const dataSources = { locations, departments };
    const user = useAppSelector((state: RootState) => state.user.user);
    const errors = useAppSelector((state: RootState) => state.user.errors);
    const checked = useAppSelector((state: RootState) => state.user.checked);

    const handleReset = () => {
      console.log('reset');
    };

    const onSubmit = () => {
      console.log('ok');
    };

    return (
      <div className={styles.container}>
        <div className={styles.title}>{SECTION_TITLES.addUser}</div>
        <ActionsPanel onApply={onSubmit} onReset={handleReset} size="large">
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
                        options={mapEntityToOptions(dataSources[field.itemsKey])}
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
      </div>
    );
  }
);
