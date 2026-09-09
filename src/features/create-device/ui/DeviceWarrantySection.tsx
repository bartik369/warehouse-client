import { Col, Row, SelectProps } from 'antd';
import dayjs from 'dayjs';
import { useFormContext, useWatch } from 'react-hook-form';
import { BiSupport } from 'react-icons/bi';
import { LuBadgeCheck, LuCalendarCheck, LuCalendarX, LuHandshake, LuTag } from 'react-icons/lu';
import { VscTypeHierarchySuper } from 'react-icons/vsc';

import { RhfDateField } from '@/shared/ui/form-fields/RhfDateField';
import { RhfSelectField } from '@/shared/ui/form-fields/RhfSelectField';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { FormSection } from '@/shared/ui/form-section/FormSection';

import { DeviceFormValues } from '../model/schema';
import styles from './DeviceFrom.module.scss';

interface DeviceWarrantySectionProps {
  options: SelectProps['options'];
}

export const DeviceWarrantySection = ({ options }: DeviceWarrantySectionProps) => {
  const { control } = useFormContext<DeviceFormValues>();
  const startWarrantyDate = useWatch({
    control,
    name: 'startWarrantyDate',
  });
  const endWarrantyDate = useWatch({
    control,
    name: 'endWarrantyDate',
  });

  return (
    <FormSection title="Гарантия" icon={<BiSupport size={18} />}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <RhfDateField<DeviceFormValues>
            name="startWarrantyDate"
            label="Начало гарантии"
            format="DD.MM.YYYY"
            maxDate={endWarrantyDate ? dayjs(endWarrantyDate) : undefined}
            prefix={<LuCalendarCheck className={styles.icon} size={16} />}
          />
        </Col>
        <Col span={12}>
          <RhfDateField<DeviceFormValues>
            name="endWarrantyDate"
            label="Окончание гарантии"
            format="DD.MM.YYYY"
            minDate={startWarrantyDate ? dayjs(startWarrantyDate) : undefined}
            prefix={<LuCalendarX className={styles.icon} size={16} />}
          />
        </Col>
        <Col span={12}>
          <RhfTextField<DeviceFormValues>
            name="warrantyNumber"
            label="Номер гарантии"
            prefix={<LuBadgeCheck className={styles.icon} size={16} />}
          />
        </Col>
        <Col span={12}>
          <RhfSelectField<DeviceFormValues>
            options={options}
            name="providerId"
            label="Подрядчик"
            prefix={<LuHandshake className={styles.icon} size={16} />}
          />
        </Col>
      </Row>
    </FormSection>
  );
};
