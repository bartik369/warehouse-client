import { useState } from 'react';

import { Flex, Modal } from 'antd';

import { SignatureItemType } from '@/store/slices/signatureSlice';
import { User } from '@/types/user';

import { useSignature } from '../model/useSignature';
import { Signature } from './Signature';
import { SignatureItem } from './SignatureItem';

interface SignatureCanvasProps {
  performerSignature: SignatureItemType;
  responsibleSignature: SignatureItemType;
  performer: User | null;
  responsible: User | null;
  performerTitle?: string;
  responsibleTitle?: string;
}
type SignatureRole = 'issuer' | 'receiver';

export const SignatureCanvas = ({
  performerSignature,
  responsibleSignature,
  performer,
  responsible,
  performerTitle,
  responsibleTitle,
}: SignatureCanvasProps) => {
  const [openedRole, setOpenedRole] = useState<SignatureRole | null>(null);
  const { actions } = useSignature();
  const handleClose = () => {
    setOpenedRole(null);
  };
  const currentSignature = openedRole === 'issuer' ? performerSignature : responsibleSignature;

  return (
    <>
      <Flex vertical gap={20}>
        <SignatureItem
          onOpen={() => setOpenedRole('issuer')}
          title={performerTitle}
          person={performer}
          signature={performerSignature}
        />
        <SignatureItem
          onOpen={() => setOpenedRole('receiver')}
          title={responsibleTitle}
          person={responsible}
          signature={responsibleSignature}
        />
      </Flex>
      <Modal open={openedRole !== null} onCancel={handleClose} footer={null} width={500}>
        {openedRole && (
          <Signature
            signature={currentSignature}
            actions={actions}
            role={openedRole}
            onClose={handleClose}
          />
        )}
      </Modal>
    </>
  );
};
