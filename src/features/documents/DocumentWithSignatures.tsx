import { pdf } from '@react-pdf/renderer';
import { IoBarcodeOutline } from 'react-icons/io5';
import { MdOutlineDone } from 'react-icons/md';

import IssueDocument from '@/components/pdf/issue/IssueDocument';
import BtnAction from '@/components/ui/buttons/BtnAction';
import EnvelopeLoader from '@/components/ui/loader/envelope/EnvelopeLoader';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { currentUser } from '@/store/slices/authSlice';
import { selectIssuerSignature, selectReceiverSignature } from '@/store/slices/signatureSlice';
import { partnerUser } from '@/store/slices/userSlice';
import { BaseDeviceQuery } from '@/types/devices';
import { BaseIssueQuery } from '@/types/issue';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { COLORS } from '@/utils/constants/ui/colors';
import { ELEMENTS_LABELS } from '@/utils/constants/ui/elements';
import { SIZES } from '@/utils/constants/ui/sizes';
import { SECTION_TITLES } from '@/utils/constants/ui/titles';

import { IssueState } from '../issue/model/issueTypes';
import styles from './Document.module.scss';
import IssueActContent from './IssueActContent';
import Signatures from './Signatures';

interface DocumentWithSignaturesProps {
  actions: BaseIssueQuery;
  state: IssueState;
}

const DocumentWithSignatures = ({ actions, state }: DocumentWithSignaturesProps) => {
  const issuerSignature = useAppSelector(selectIssuerSignature);
  const receiverSignature = useAppSelector(selectReceiverSignature);
  const issueUser = useAppSelector(currentUser);
  const receiverUser = useAppSelector(partnerUser);
  const date = new Date();

  const generatePDFBlob = async (): Promise<Blob> => {
    const doc = (
      <IssueDocument
        date={date.toLocaleDateString('Ru-ru')}
        docNumber={state.deviceIssueData?.processId || ''}
        tableData={state.assignedDevices}
        firstNameRuCurrent={issueUser?.firstNameRu || ''}
        lastNameRuCurrent={issueUser?.lastNameRu || ''}
        firstNameRuPartner={receiverUser?.firstNameRu || ''}
        lastNameRuPartner={receiverUser?.lastNameRu || ''}
        issuerSignature={issuerSignature}
        receiverSignature={receiverSignature}
      />
    );

    const instance = pdf();
    await instance.updateContainer(doc);
    const blob = await instance.toBlob();
    const fileName = `${state.deviceIssueData?.processId}.pdf`;
    return new File([blob], fileName, { type: 'application/pdf' });
  };

  const handleSend = async () => {
    try {
      const blob = await generatePDFBlob();
      actions.handleCompleteProcess(blob);
    } catch (err) {
      console.error('Ошибка при отправке PDF:', err);
    }
  };

  return (
    <div className={styles.wrapper}>
      {actions.isIssueLoading && (
        <div className={styles.loader}>
          <EnvelopeLoader />
        </div>
      )}
      <div className={styles.innerWrapper}>
        <div className={styles.logo}>
          <IoBarcodeOutline className={styles.icon} />
          <span>{ELEMENTS_LABELS.logoText}</span>
        </div>
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.number}>
              <span>{SECTION_TITLES.actIssueTitle}</span>
              {state.deviceIssueData?.processId}
            </div>
            <time className={styles.date} dateTime={date.toISOString()}>
              {date.toLocaleDateString('ru-RU')}
            </time>
          </header>
          <div className={styles.info}>
            <IssueActContent state={state} actions={actions} />
          </div>
          <Signatures
            issuerSignature={issuerSignature}
            receiverSignature={receiverSignature}
            issueUser={issueUser}
            receiverUser={receiverUser}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <BtnAction
          size={SIZES.md}
          color={COLORS.darkGreen}
          click={handleSend}
          title={BUTTON_LABELS.issue}
          icon={<MdOutlineDone />}
        />
      </div>
    </div>
  );
};

export default DocumentWithSignatures;
