import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from './Signature.module.scss';
import { SignatureActions } from "../../types/signature";
import { useGlobalModal } from "../../hooks/data/useGlobalModal";

interface SignatureProps {
  actions: SignatureActions;
  role: string;
}

const Signature: React.FC<SignatureProps> = ({ actions, role }) => {
  const canvasRef = useRef<SignatureCanvas>(null);
  const { closeModal } = useGlobalModal();
  console.log(role)

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
    <div>
      <div>
        <h2>Подпишите здесь</h2>
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
        <div>
          <button onClick={handleClear}>
            Очистить
          </button>
          <div className="space-x-2">
            <button
              onClick={closeModal}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signature;
