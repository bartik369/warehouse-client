import { useState } from 'react';

import { Flex, Modal } from 'antd';

import { User } from '@/types/user';

import { useSignature } from '../model/useSignature';
import Signature from './Signature';
import { SignatureItem } from './SignatureItem';

interface SignatureCanvasProps {
  performerSignature: string | null;
  responsibleSignature: string | null;
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
        {openedRole && <Signature actions={actions} role={openedRole} onClose={handleClose} />}
      </Modal>
    </>
  );
};
