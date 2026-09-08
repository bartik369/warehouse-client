import { Col, Row, SelectProps } from 'antd';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { LiaWarehouseSolid } from 'react-icons/lia';
import { LuActivity } from 'react-icons/lu';

import { RhfSelectField } from '@/shared/ui/form-fields/RhfSelectField';
import { FormSection } from '@/shared/ui/form-section/FormSection';

import { DeviceFormValues } from '../model/schema';
import styles from './DeviceFrom.module.scss';

interface DeviceStatusAndLocationSectionProps {
  warehousesOptions: SelectProps['options'];
  functionalOptions: SelectProps['options'];
}

export const DeviceStatusAndLocationSection = ({
  warehousesOptions,
  functionalOptions,
}: DeviceStatusAndLocationSectionProps) => {
  return (
    <FormSection title="Состояние и локация" icon={<HiOutlineLocationMarker size={20} />}>
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <RhfSelectField<DeviceFormValues>
            options={warehousesOptions}
            name="warehouseId"
            label="Склад"
            prefix={<LiaWarehouseSolid className={styles.icon} size={16} />}
          />
        </Col>

        <Col span={8}>
          <RhfSelectField<DeviceFormValues>
            options={functionalOptions}
            name="isFunctional"
            label="Исправность"
            prefix={<LuActivity className={styles.icon} size={15} />}
            toSelectValue={(value) => (value == null ? undefined : Number(value))}
            fromSelectValue={(value) => (value == null ? undefined : Boolean(value))}
          />
        </Col>
      </Row>
    </FormSection>
  );
};
