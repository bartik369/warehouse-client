import { Card, Flex, Typography } from 'antd';
import { FaFilePdf } from 'react-icons/fa6';
import { TbDownload } from 'react-icons/tb';

import { EquipmentIssuance } from '@/features/issue-device/model/types';
import { IconButton } from '@/shared/ui/icon-button/IconButton';

import styles from '../EquipmentIssuanceInfo.module.scss';

interface ProcessFileProps {
  detail: EquipmentIssuance;
}

export const ProcessFile = ({ detail }: ProcessFileProps) => {
  return (
    <Card>
      <Typography.Title className={styles.title} level={2}>
        Документы
      </Typography.Title>
      <Card>
        <Flex justify="space-between" align="center">
          <Flex gap={10}>
            <div className={styles.fileIcon}>
              <FaFilePdf className={styles.icon} size={20} />
            </div>
            <Flex vertical className={styles.file}>
              <span className={styles.label}>Акт выдачи устройства</span>
              <span className={styles.value}>{`${detail.documentNo}.pdf`}</span>
            </Flex>
          </Flex>
          <IconButton>
            <TbDownload size={17} />
          </IconButton>
        </Flex>
      </Card>
    </Card>
  );
};
