import { useEffect, useRef, useState } from 'react';

import { Flex, Typography } from 'antd';
import { IoSaveOutline } from 'react-icons/io5';
import { LuPencil } from 'react-icons/lu';
import { MdOutlineCancel } from 'react-icons/md';
import { PiEraser } from 'react-icons/pi';
import SignatureCanvas from 'react-signature-canvas';

import { SignatureItemType } from '@/store/slices/signatureSlice';
import { SignatureActions } from '@/types/signature';

import { SignatureRole } from '../model/types';
import styles from './Signature.module.scss';
import { ActionButton } from './action-button/ActionButton';

interface SignatureProps {
  actions: SignatureActions;
  role: SignatureRole;
  signature: SignatureItemType;
  onClose: () => void;
}

export const Signature = ({ actions, role, signature, onClose }: SignatureProps) => {
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

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.clear();

    if (signature) {
      canvas.fromDataURL(signature.signature ?? '');
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [role, signature]);

  return (
    <Flex vertical className={styles.inner}>
      <div className={styles.header}>
        <Typography.Title className={styles.title}>Подпись сотрудника</Typography.Title>
        <div className={styles.description}>Поставьте свою подпись ниже</div>
      </div>
      <div
        className={styles.signatures}
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: '#f6f7fb',
          flexDirection: 'row',
          marginTop: 'auto',
          cursor: 'crosshair',
        }}
      >
        <SignatureCanvas
          ref={canvasRef}
          penColor="#1e3a5f"
          minWidth={1}
          maxWidth={1}
          canvasProps={{
            width: 400,
            height: 200,
            className: styles.wrapper,
          }}
          onBegin={() => setIsEmpty(false)}
        />
      </div>
      <div className={styles.description}>
        <LuPencil size={14} />
        <span>Поставьте подпись мышью, трекпадом или на сенсерном экране</span>
      </div>
      <div className={styles.actions}>
        <ActionButton
          onClick={onClose}
          title="Отмена"
          variant="cancel"
          icon={MdOutlineCancel}
          iconSize={17}
        />
        <ActionButton
          onClick={handleClear}
          title="Очистить"
          variant="reset"
          icon={PiEraser}
          iconSize={18}
        />
        <ActionButton onClick={handleSave} title="Сохранить" variant="apply" icon={IoSaveOutline} />
      </div>
    </Flex>
  );
};
