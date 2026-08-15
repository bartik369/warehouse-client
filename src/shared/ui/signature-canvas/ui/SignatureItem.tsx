import { Flex, Typography } from 'antd';
import { BsVectorPen } from 'react-icons/bs';
import { HiOutlinePencil } from 'react-icons/hi2';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

import { SignatureItemType } from '@/store/slices/signatureSlice';
import { User } from '@/types/user';

import { CustomTag } from '../../custom-tag/CustomTag';
import styles from './SignatureItem.module.scss';

interface SignatureItemProps {
  title?: string;
  signature: SignatureItemType;
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
            {person?.lastNameRu} {person?.firstNameRu}
          </Typography.Text>
        </div>
        <div
          className={`${styles.pic} ${signature.signature ? styles.filed : styles.empty}`}
          onClick={onOpen}
        >
          {signature.signature && <img src={signature.signature ?? ''} />}
          {!signature.signature && (
            <div className={styles.pen}>
              <BsVectorPen size={17} />
            </div>
          )}
        </div>
        <div className={styles.time}>{signature.time && signature.time}</div>
      </div>
      <div className={styles.status}>
        {signature.signature ? (
          <CustomTag variant="success" title="Подписано" icon={IoCheckmarkCircleOutline} />
        ) : (
          <CustomTag variant="processing" title="Не подписано" />
        )}
      </div>
    </Flex>
  );
};
