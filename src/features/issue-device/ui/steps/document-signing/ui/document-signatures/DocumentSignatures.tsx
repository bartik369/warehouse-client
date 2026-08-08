import { Flex, Typography } from 'antd';

import { User } from '@/entities/user/model/types';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { SignatureCanvas } from '@/shared/ui/signature-canvas/SignatureCanvas';
import { currentUser } from '@/store/slices/authSlice';
import { selectIssuerSignature, selectReceiverSignature } from '@/store/slices/signatureSlice';

interface DocumentSignaturesProps {
  user: User | null;
}

export const DocumentSignatures = ({ user }: DocumentSignaturesProps) => {
  const issuerSignature = useAppSelector(selectIssuerSignature);
  const receiverSignature = useAppSelector(selectReceiverSignature);
  const issueUser = useAppSelector(currentUser);
  return (
    <Flex vertical>
      <Typography.Title level={5}>Подписи сторон</Typography.Title>
      <SignatureCanvas
        performer={issueUser}
        responsible={user}
        performerSignature={issuerSignature}
        responsibleSignature={receiverSignature}
        performerTitle="Передал(представитель компании)"
        responsibleTitle="Получил(сотрудник)"
      />
    </Flex>
  );
};
