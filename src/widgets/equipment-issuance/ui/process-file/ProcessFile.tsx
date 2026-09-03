import { Card, Flex, Typography } from 'antd';
import { FaFilePdf } from 'react-icons/fa6';
import { TbDownload } from 'react-icons/tb';

import { EquipmentIssuance } from '@/features/issue-device/model/types';
import { downloadFile } from '@/shared/lib/ download-file/download-file';
import { IconButton } from '@/shared/ui/icon-button/IconButton';
import { Spinner } from '@/shared/ui/spinner/Spinner';
import { useDownloadIssueFileMutation } from '@/store/api/issueApi';

import styles from '../EquipmentIssuanceInfo.module.scss';

interface ProcessFileProps {
  detail: EquipmentIssuance;
}

export const ProcessFile = ({ detail }: ProcessFileProps) => {
  const [downloadIssueFile, { isLoading }] = useDownloadIssueFileMutation();
  const handleGetIssueFile = async () => {
    try {
      if (!detail.fileId || isLoading) return;
      const blob = await downloadIssueFile(detail.fileId).unwrap();
      downloadFile(blob, `${detail.documentNo ?? 'document'}.pdf`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <Typography.Title className={styles.title} level={2}>
        Документы
      </Typography.Title>
      <Card>
        <Flex justify="space-between" align="center">
          <Flex gap={10} className={styles.container}>
            <div className={styles.fileIcon}>
              <FaFilePdf className={styles.icon} size={20} />
            </div>
            <Flex vertical className={styles.file}>
              <span className={styles.label}>Акт выдачи устройства</span>
              <span className={styles.value}>{`${detail.documentNo}.pdf`}</span>
            </Flex>
          </Flex>
          {isLoading && <Spinner fontSize={25} />}
          <IconButton
            size="lg"
            variant="primary"
            onClick={handleGetIssueFile}
            loading={isLoading}
            icon={TbDownload}
            iconSize={17}
          />
        </Flex>
      </Card>
    </Card>
  );
};
