import { Flex, Typography } from 'antd';
import { HiOutlinePencil } from 'react-icons/hi2';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

import { useGlobalModal } from '@/hooks/data/useGlobalModal';
import { User } from '@/types/user';

import { CustomTag } from '../custom-tag/CustomTag';
import styles from './SignatureCanvas.module.scss';

interface SignatureCanvasProps {
  performerSignature: string | null;
  responsibleSignature: string | null;
  performer: User | null;
  responsible: User | null;
  performerTitle?: string;
  responsibleTitle?: string;
}

export const SignatureCanvas = ({
  performerSignature,
  responsibleSignature,
  performer,
  responsible,
  performerTitle,
  responsibleTitle,
}: SignatureCanvasProps) => {
  const { openModal } = useGlobalModal();
  return (
    <Flex vertical gap={20}>
      <Flex className={styles.item}>
        <div className={styles.content}>
          <div className={styles.user}>
            <Typography.Text className={styles.title}>{performerTitle}</Typography.Text>
            <Typography.Text className={styles.value}>
              {performer?.firstNameRu} {performer?.lastNameRu}
            </Typography.Text>
          </div>
          <div
            className={`${styles.pic} ${performerSignature ? styles.filed : styles.empty}`}
            onClick={() =>
              openModal('signature', {
                maxWidth: 400,
                role: 'issuer',
              })
            }
          >
            {performerSignature && <img src={performerSignature} />}
            {!performerSignature && (
              <span>
                <HiOutlinePencil size={24} />
              </span>
            )}
          </div>
        </div>
        <div className={styles.status}>
          {performerSignature ? (
            <CustomTag variant="success" title="Подписано" icon={IoCheckmarkCircleOutline} />
          ) : (
            <CustomTag variant="processing" title="Не подписано" />
          )}
        </div>
      </Flex>

      <div className={styles.item}>
        <div className={styles.user}>
          {responsible?.firstNameRu} {responsible?.lastNameRu}
        </div>
        <div
          className={`${styles.pic} ${responsibleSignature ? styles.filed : styles.empty}`}
          onClick={() =>
            openModal('signature', {
              maxWidth: 400,
              role: 'receiver',
            })
          }
        >
          {!responsibleSignature && (
            <span>
              <HiOutlinePencil size={30} />
            </span>
          )}
          {responsibleSignature && <img src={responsibleSignature} alt="Подпись получателя" />}
        </div>
      </div>
    </Flex>
  );
};
