import { Col, Row } from 'antd';
import { LuInfo } from 'react-icons/lu';
import { LuScanBarcode, LuTag } from 'react-icons/lu';
import { LuCpu } from 'react-icons/lu';
import { LuMemoryStick, LuMonitor, LuWeight } from 'react-icons/lu';

import { RhfNumberField } from '@/shared/ui/form-fields/RhfNumberField';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { FormSection } from '@/shared/ui/form-section/FormSection';

import { DeviceFormValues } from '../model/schema';
import styles from './DeviceFrom.module.scss';

export const DeviceInfoSection = () => {
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
          <RhfNumberField<DeviceFormValues>
            label="Диагональ экрана(дюйм)"
            name="screeSize"
            prefix={<LuMonitor className={styles.icon} size={15} />}
          />
        </Col>
        <Col span={8}>
          <RhfNumberField<DeviceFormValues>
            label="Объем памяти(гб)"
            name="memorySize"
            step={2}
            prefix={<LuMemoryStick className={styles.icon} size={15} />}
          />
        </Col>
      </Row>
    </FormSection>
  );
};
