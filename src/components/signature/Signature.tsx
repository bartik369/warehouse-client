import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { SignatureActions } from "../../types/signature";
import { useGlobalModal } from "../../hooks/data/useGlobalModal";
import BtnAction from "../ui/buttons/BtnAction";
import { MdOutlineCancel } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";



import styles from './Signature.module.scss';
import { cancel, reset, save } from "../../utils/constants/constants";

interface SignatureProps {
  actions: SignatureActions;
  role: string;
}

const Signature: React.FC<SignatureProps> = ({ actions, role }) => {
  const canvasRef = useRef<SignatureCanvas>(null);
  const { closeModal } = useGlobalModal();
  const handleSave = () => {
    const img = canvasRef.current?.getCanvas().toDataURL("image/png");
    if (img && role) {
      actions.handleSetSignature(img, role);
    }
  };

  const handleClear = () => {
    canvasRef.current?.clear();
  };

  return (
    <div className={styles.inner}>
      <div className={styles.signatures}
  style={{
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#f6f7fb',
    flexDirection: 'row',
    marginTop: 'auto',
  }}>
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
        />
      </div>
      <div className={styles.actions}>
        <BtnAction 
        size="sm" 
        color="dark-grey" 
        title={reset}
        icon={<RiResetLeftFill />}
        click={handleClear} 
        />
        <BtnAction 
        size="sm" 
        color="red" 
        title={cancel}
        icon={<MdOutlineCancel />}
        click={closeModal} 
        />
        <BtnAction 
        size="sm" 
        color="dark-green" 
        title={save}
        icon={<IoAddCircleOutline />}
        click={handleSave} 
        />
      </div>
    </div>
  );
};

export default Signature;
