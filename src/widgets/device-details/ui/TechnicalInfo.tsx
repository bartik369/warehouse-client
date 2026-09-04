import { Divider } from 'antd';
import { Card, Flex, Tooltip, Typography } from 'antd';
import { CiCircleList } from 'react-icons/ci';

import { DeviceDetails } from '@/entities/device/model/types';

import { getCommonCharacteristics, getTechnicalCharacteristics } from '../model/constants';
import styles from './DeviceDetails.module.scss';

interface TechnicalInfoProps {
  device: DeviceDetails;
}
export const TechnicalInfo = ({ device }: TechnicalInfoProps) => {
  const commonCharacteristics = getCommonCharacteristics(device);
  const technicalCharacteristics = getTechnicalCharacteristics(device);
  return (
    <Card className={styles.container}>
      <Flex vertical gap={10}>
        <Flex className={styles.titleContent}>
          <Flex className={styles.icon}>
            <CiCircleList size={17} />
          </Flex>
          <Typography.Title className={styles.title} level={2}>
            Характеристики
          </Typography.Title>
        </Flex>
        <Flex vertical gap={4}>
          {commonCharacteristics.map(({ label, value }) => (
            <div className={styles.row} key={label}>
              <span className={styles.label}>{label}</span>
              <span className={styles.dots} />
              <Typography.Text
                className={styles.value}
                ellipsis={{
                  tooltip: value ?? '—',
                }}
              >
                {value ?? '—'}
              </Typography.Text>
            </div>
          ))}
        </Flex>
        <Divider style={{ margin: '4px 0px' }} />
        <Flex vertical gap={4}>
          {technicalCharacteristics.map(({ label, value }) => (
            <div className={styles.row} key={label}>
              <span className={styles.label}>{label}</span>
              <span className={styles.dots} />
              <span className={styles.value}>{value ?? '—'}</span>
            </div>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};
