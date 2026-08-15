import { Flex, Typography } from 'antd';
import { IoMdInformationCircle } from 'react-icons/io';

import { User } from '@/entities/user/model/types';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { SignatureCanvas } from '@/shared/ui/signature-canvas/ui/SignatureCanvas';
import { currentUser } from '@/store/slices/authSlice';
import { selectIssuerSignature, selectReceiverSignature } from '@/store/slices/signatureSlice';
import { SECTION_TITLES } from '@/utils/constants/ui/titles';

import styles from './DocumentSignatures.module.scss';

interface DocumentSignaturesProps {
  user: User | null;
}

export const DocumentSignatures = ({ user }: DocumentSignaturesProps) => {
  const issuerSignature = useAppSelector(selectIssuerSignature);
  const receiverSignature = useAppSelector(selectReceiverSignature);
  const issueUser = useAppSelector(currentUser);

  const isSignedByBothParties = issuerSignature.signature && receiverSignature.signature;
  return (
    <Flex vertical>
      <Typography.Title level={5}>{SECTION_TITLES.signatureSides}</Typography.Title>
      <SignatureCanvas
        performer={issueUser}
        responsible={user}
        performerSignature={issuerSignature}
        responsibleSignature={receiverSignature}
        performerTitle="Передал(представитель компании)"
        responsibleTitle="Получил(сотрудник)"
      />
      {isSignedByBothParties && (
        <Flex className={styles.info}>
          <IoMdInformationCircle size={22} className={styles.icon} />
          <span style={{ fontSize: 10 }}>
            Оба участника подписали документ. Проверьте данные и перейдите к отправке документа
          </span>
        </Flex>
      )}
    </Flex>
  );
};
