import { Col, Row } from 'antd';
import { LuInfo } from 'react-icons/lu';
import { LuScanBarcode, LuTag } from 'react-icons/lu';
import { LuCpu } from 'react-icons/lu';
import { LuMemoryStick, LuMonitor, LuWeight } from 'react-icons/lu';

import { DeviceType } from '@/entities/type/model/types';
import { RhfNumberField } from '@/shared/ui/form-fields/RhfNumberField';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { FormSection } from '@/shared/ui/form-section/FormSection';

import { DEVICE_TYPE_FIELDS } from '../model/constants';
import { DeviceFormValues } from '../model/schema';
import styles from './DeviceFrom.module.scss';

interface DeviceInfoSectionProps {
  selectedType: DeviceType;
}

export const DeviceInfoSection = ({ selectedType }: DeviceInfoSectionProps) => {
  const typeFields = selectedType
    ? DEVICE_TYPE_FIELDS[selectedType.slug as keyof typeof DEVICE_TYPE_FIELDS]
    : undefined;
  return (
    <FormSection title="Основаная информация" icon={<LuInfo size={18} />}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <RhfTextField<DeviceFormValues>
            name="inventoryNumber"
            label="Инвентарный номер"
            prefix={<LuScanBarcode className={styles.icon} size={15} />}
          />
        </Col>

        <Col span={8}>
          <RhfTextField<DeviceFormValues>
            name="modelCode"
            label="Код модели"
            prefix={<LuCpu className={styles.icon} size={15} />}
          />
        </Col>
        <Col span={8}>
          <RhfTextField<DeviceFormValues>
            name="serialNumber"
            label="Серийный номер"
            prefix={<LuTag className={styles.icon} size={15} />}
          />
        </Col>
        <Col span={8}>
          <RhfNumberField<DeviceFormValues>
            label="Вес(кг)"
            name="weight"
            step={0.001}
            prefix={<LuWeight className={styles.icon} size={15} />}
          />
        </Col>
        <Col span={8}>
          {typeFields?.screenSize && (
            <RhfNumberField<DeviceFormValues> name="screenSize" label="Диагональ экрана" />
          )}
        </Col>
        <Col span={8}>
          {typeFields?.memorySize && (
            <RhfNumberField<DeviceFormValues> name="memorySize" label="Оперативная память" />
          )}
        </Col>
      </Row>
    </FormSection>
  );
};
