import { createApi } from '@reduxjs/toolkit/query/react';
import { Col, Row, SelectProps } from 'antd';
import { CgNametag } from 'react-icons/cg';
import { LuBox } from 'react-icons/lu';
import { LuFactory } from 'react-icons/lu';
import { RxBoxModel } from 'react-icons/rx';
import { VscTypeHierarchySuper } from 'react-icons/vsc';

import { RhfSelectField } from '@/shared/ui/form-fields/RhfSelectField';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { FormSection } from '@/shared/ui/form-section/FormSection';

import { DeviceFormValues } from '../model/schema';
import styles from './DeviceFrom.module.scss';

interface DeviceModelSectionProps {
  availableModel: boolean;
  manufacturersOptions: SelectProps['options'];
  typesOptions: SelectProps['options'];
  modelsOptions: SelectProps['options'];
  isLoadingModels: boolean;
}

export const DeviceModelSection = ({
  availableModel = false,
  manufacturersOptions,
  typesOptions,
  modelsOptions,
  isLoadingModels,
}: DeviceModelSectionProps) => {
  return (
    <FormSection title="Модель устройства" icon={<RxBoxModel />}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <RhfTextField<DeviceFormValues>
            name="name"
            label="Название"
            prefix={<CgNametag className={styles.icon} size={19} />}
          />
        </Col>
        <Col span={12}>
          <RhfSelectField<DeviceFormValues>
            options={typesOptions}
            name="typeId"
            label="Тип(demo - Ноутбук)"
            prefix={<VscTypeHierarchySuper className={styles.icon} size={15} />}
          />
        </Col>
        <Col span={12}>
          <RhfSelectField<DeviceFormValues>
            options={manufacturersOptions}
            name="manufacturerId"
            label="Производитель(demo - Dell)"
            prefix={<LuFactory className={styles.icon} size={15} />}
          />
        </Col>
        <Col span={12}>
          {availableModel && (
            <RhfSelectField<DeviceFormValues>
              options={modelsOptions}
              name="modelId"
              label="Модель(demo - любая модель)"
              prefix={<LuBox className={styles.icon} size={16} />}
              loading={isLoadingModels}
            />
          )}
        </Col>
      </Row>
    </FormSection>
  );
};
