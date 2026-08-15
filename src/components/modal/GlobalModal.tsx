import { useGlobalModal } from '@/hooks/data/useGlobalModal';

import { useSignature } from '../../shared/ui/signature-canvas/model/useSignature';
// import ContractorForm from "../forms/contractor/ContractorForm";
import EntityForm from '../forms/device/EntityForm';
import Modal from './Modal';

export const GlobalModal = () => {
  const { isOpen, modalType, modalProps, closeModal } = useGlobalModal();
  const { actions } = useSignature();

  if (!isOpen) return null;

  const renderContent = () => {
    switch (modalType) {
      case 'type':
      case 'model':
      case 'manufacturer':
        return (
          <EntityForm
            typeId={modalProps.typeId}
            manufacturerId={modalProps.manufacturerId}
            fieldType={modalProps.fieldType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      maxWidth={modalProps.maxWidth}
      isOpen={isOpen}
      setIsOpen={closeModal}
      title={modalProps.title || ''}
    >
      {renderContent()}
    </Modal>
  );
};
