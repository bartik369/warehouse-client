import { Flex, Typography } from 'antd';
import { HiOutlinePencil } from 'react-icons/hi2';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

import { User } from '@/types/user';

import { CustomTag } from '../../custom-tag/CustomTag';
import styles from './SignatureItem.module.scss';

interface SignatureItemProps {
  title?: string;
  signature: string | null;
  person: User | null;
  onOpen: () => void;
}

export const SignatureItem = ({ title, person, signature, onOpen }: SignatureItemProps) => {
  return (
    <Flex className={styles.item}>
      <div className={styles.content}>
        <div className={styles.user}>
          <Typography.Text className={styles.title}>{title}</Typography.Text>
          <Typography.Text className={styles.value}>
            {person?.firstNameRu} {person?.lastNameRu}
          </Typography.Text>
        </div>
        <div
          className={`${styles.pic} ${signature ? styles.filed : styles.empty}`}
          onClick={onOpen}
        >
          {signature && <img src={signature} />}
          {!signature && (
            <span>
              <HiOutlinePencil size={24} />
            </span>
          )}
        </div>
      </div>
      <div className={styles.status}>
        {signature ? (
          <CustomTag variant="success" title="Подписано" icon={IoCheckmarkCircleOutline} />
        ) : (
          <CustomTag variant="processing" title="Не подписано" />
        )}
      </div>
    </Flex>
  );
};
