import { Empty, Flex, Tag, Typography } from 'antd';
import { Divider } from 'antd';
import { CiCalendar } from 'react-icons/ci';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { LiaUser } from 'react-icons/lia';
import { SlLocationPin } from 'react-icons/sl';

import { Warehouse } from '@/entities/warehouse/model/types';
import { CustomTag } from '@/shared/ui/custom-tag/CustomTag';

import warehouseIllustration from '../../../../../../../assets/elements/warehouse.png';
import styles from './Information.module.scss';

interface InformationProps {
  warehouse: Warehouse | null;
  location?: string;
}
// todo изменить замоканную логику информации по отвественному и инвентаризации
export const Information = ({ warehouse, location }: InformationProps) => {
  return (
    <>
      {warehouse ? (
        <Flex vertical>
          <div className={styles.pick}>
            <div className={styles.tag}>
              <CustomTag title="Выбран" icon={IoCheckmarkCircleOutline} variant="success" />
            </div>
            <img className={styles.illustration} src={warehouseIllustration} />
          </div>
          <Typography.Title level={4}>{warehouse.name}</Typography.Title>
          <Flex align="center" gap={5}>
            <SlLocationPin size={15} />
            {location}
          </Flex>
          <Divider style={{ margin: '12px 0' }} />
          <Flex gap={50}>
            <Flex gap={12} align="flex-start">
              <div className={styles.icon}>
                <LiaUser size={24} />
              </div>
              <Flex vertical>
                <span className={styles.label}>Ответственный</span>
                <span className={styles.name}>ФИО сотрудника</span>
                <span className={styles.department}>IT-отдел</span>
              </Flex>
            </Flex>
            <Flex gap={12} align="flex-start">
              <div className={styles.icon}>
                <CiCalendar size={24} />
              </div>
              <Flex vertical>
                <span className={styles.label}>Последняя инвентаризация</span>
                <span className={styles.name}>26.05.2025</span>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Empty />
      )}
    </>
  );
};
