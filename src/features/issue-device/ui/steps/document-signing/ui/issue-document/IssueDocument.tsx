import { Card, Flex, Typography } from 'antd';
import { LuDownload } from 'react-icons/lu';

import { Device } from '@/entities/device/model/types';
import { User } from '@/entities/user/model/types';
import IssueActContent from '@/features/documents/IssueActContent';
import { IssueState } from '@/features/issue-device/model/useIssue';
import { AssignedDevicesTable } from '@/features/issue-device/ui/assigned-devices-table/AssignedDevicesTable';

import styles from './IssueDocument.module.scss';

interface IssueDocumentProps {
  user: User | null;
  devices: Device[];
  state: IssueState;
}
export const IssueDocument = ({ devices, user, state }: IssueDocumentProps) => {
  return (
    <Flex vertical gap={10}>
      <Flex className={styles.header}>
        <Typography.Title className={styles.title} level={5}>
          Документ на выдачу устройств
        </Typography.Title>
        <button className={styles.downloadBtn}>
          <LuDownload size={12} />
          <span>Скачать PDF</span>
        </button>
      </Flex>
      <Card>
        <Flex vertical align="center" gap={25}>
          <Flex vertical gap={10} align="center">
            <Typography.Title className={styles.title} level={5}>
              Акт приема-передачи оборудования:
            </Typography.Title>
            <Typography.Title className={styles.title} level={5}>
              {state.issueNumber}
            </Typography.Title>
          </Flex>
          <Flex vertical gap={10}>
            <IssueActContent user={user} />
            <AssignedDevicesTable devices={devices} />
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
