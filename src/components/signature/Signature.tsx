import React, { useRef } from "react";
import BtnAction from "../ui/buttons/BtnAction";
import SignatureCanvas from "react-signature-canvas";
import { useGlobalModal } from "../../hooks/data/useGlobalModal";
import { SignatureActions } from "../../types/signature";
import { cancel, clean, colorDarkGreen, colorDarkGrey,
   colorGreyLight, save } from "../../utils/constants/constants";
import { RiResetLeftFill } from "react-icons/ri";
import { IoSaveOutline } from "react-icons/io5";
import { RiDeleteBack2Line } from "react-icons/ri";
import styles from "./Signature.module.scss";

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
      <div
        className={styles.signatures}
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "#f6f7fb",
          flexDirection: "row",
          marginTop: "auto",
        }}
      >
        <SignatureCanvas
          ref={canvasRef}
          penColor="black"
          minWidth={2}
          maxWidth={2}
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
          color={colorDarkGrey}
          title={cancel}
          icon={<RiDeleteBack2Line />}
          click={closeModal}
        />
        <BtnAction
          size="sm"
          color={colorGreyLight}
          title={clean}
          icon={<RiResetLeftFill />}
          click={handleClear}
        />
        <BtnAction
          size="sm"
          color={colorDarkGreen}
          title={save}
          icon={<IoSaveOutline />}
          click={handleSave}
        />
      </div>
    </div>
  );
};

export default Signature;
