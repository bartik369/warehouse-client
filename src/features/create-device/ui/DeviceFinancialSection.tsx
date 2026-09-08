import { Col, Row } from 'antd';
import { LuRussianRuble, LuWalletCards } from 'react-icons/lu';

import { RhfNumberField } from '@/shared/ui/form-fields/RhfNumberField';
import { FormSection } from '@/shared/ui/form-section/FormSection';

import { DeviceFormValues } from '../model/schema';
import styles from './DeviceFrom.module.scss';

export const DeviceFinancialSection = () => {
  return (
    <FormSection title="Финансовая информация" icon={<LuWalletCards size={18} />}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <RhfNumberField<DeviceFormValues>
            label="Цена с НДС"
            name="price_with_vat"
            prefix={<LuRussianRuble className={styles.icon} size={15} />}
          />
        </Col>
        <Col span={8}>
          <RhfNumberField<DeviceFormValues>
            label="Цена без НДС"
            name="price_without_vat"
            prefix={<LuRussianRuble className={styles.icon} size={15} />}
          />
        </Col>
        <Col span={8}>
          <RhfNumberField<DeviceFormValues>
            label="Остаточная цена"
            name="residual_price"
            prefix={<LuRussianRuble className={styles.icon} size={15} />}
          />
        </Col>
      </Row>
    </FormSection>
  );
};
