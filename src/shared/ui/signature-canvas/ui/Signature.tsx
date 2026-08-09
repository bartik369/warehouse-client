import React, { useRef, useState } from 'react';

import { Button } from 'antd';
import { IoSaveOutline } from 'react-icons/io5';
import { RiResetLeftFill } from 'react-icons/ri';
import { RiDeleteBack2Line } from 'react-icons/ri';
import SignatureCanvas from 'react-signature-canvas';

import { useGlobalModal } from '@/hooks/data/useGlobalModal';
import { SignatureActions } from '@/types/signature';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { COLORS } from '@/utils/constants/ui/colors';

import BtnAction from '../../../../components/ui/buttons/BtnAction';
import styles from './Signature.module.scss';

interface SignatureProps {
  actions: SignatureActions;
  role: string;
  onClose: () => void;
}

const Signature: React.FC<SignatureProps> = ({ actions, role, onClose }) => {
  const canvasRef = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleSave = () => {
    if (canvasRef.current?.isEmpty()) return;

    const img = canvasRef.current?.getCanvas().toDataURL('image/png');

    if (img && role) {
      actions.handleSetSignature(img, role);
    }
    onClose();
  };

  const handleClear = () => {
    canvasRef.current?.clear();
    actions.handleResetSignature(role);
    setIsEmpty(true);
  };

  return (
    <div className={styles.inner}>
      <div
        className={styles.signatures}
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: '#f6f7fb',
          flexDirection: 'row',
          marginTop: 'auto',
          cursor: 'url(/src/assets/elements/write.png) 0 32, auto',
        }}
      >
        <SignatureCanvas
          ref={canvasRef}
          penColor="black"
          minWidth={1}
          maxWidth={1}
          canvasProps={{
            width: 400,
            height: 300,
            className: styles.wrapper,
          }}
          onBegin={() => setIsEmpty(false)}
        />
      </div>
      <div className={styles.actions}>
        <BtnAction
          size="sm"
          color={COLORS.grey}
          title={BUTTON_LABELS.cancel}
          icon={<RiDeleteBack2Line />}
          click={onClose}
        />
        <BtnAction
          size="sm"
          color={COLORS.grey}
          title={BUTTON_LABELS.clean}
          icon={<RiResetLeftFill />}
          click={handleClear}
        />
        <Button disabled={isEmpty} icon={<IoSaveOutline />} onClick={handleSave}>
          {BUTTON_LABELS.save}
        </Button>
      </div>
    </div>
  );
};

export default Signature;
