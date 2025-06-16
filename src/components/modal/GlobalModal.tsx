import { useGlobalModal } from '../../hooks/data/useGlobalModal';
import ContractorForm from '../forms/contractor/ContractorForm';
import EntityForm from '../forms/device/EntityForm';
import DeviceIssueForm from '../deviceIssue/DeviceIssueForm';
import Modal from './Modal';
import { IssueProvider } from '../../features/issue/context/IssueContext';

export const GlobalModal = () => {
  const { isOpen, modalType, modalProps, closeModal } = useGlobalModal();

  if (!isOpen) return null;

  const renderContent = () => {
    switch (modalType) {
      case 'type':
      case 'model':
      case 'manufacturer':
        return <EntityForm
                    typeId={modalProps.typeId}
                    manufacturerId={modalProps.manufacturerId}
                    fieldType={modalProps.fieldType}
                  />;
      case 'contractor':
        return <ContractorForm {...modalProps} />;
      case 'device-issue':
        return <IssueProvider><DeviceIssueForm /></IssueProvider>;
      default:
        return null;
    }
  };

  return (
    <Modal maxWidth={modalProps.maxWidth} isOpen={isOpen} setIsOpen={closeModal} title={modalProps.title || ''}>
      {renderContent()}
    </Modal>
  );
};

