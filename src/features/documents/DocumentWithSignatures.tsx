import React, { useRef } from 'react';
import IssueActContent from './IssueActContent';
import { useGlobalModal } from '../../hooks/data/useGlobalModal';
import { useAppSelector } from '../../hooks/redux/useRedux';
import { currentUser } from '../../store/slices/authSlice';
import { partnerUser } from '../../store/slices/userSlice';
import { selectIssuerSignature, selectReceiverSignature } from '../../store/slices/signatureSlice';
import styles from './Document.module.scss';
import html2pdf from 'html2pdf.js';

const DocumentWithSignatures = () => {
  const documentRef = useRef<HTMLDivElement>(null);
  const issuerSignature = useAppSelector(selectIssuerSignature);
  const receiverSignature =  useAppSelector(selectReceiverSignature);
  const issueUser = useAppSelector(currentUser);
  const receiverUser = useAppSelector(partnerUser);
  const {openModal} = useGlobalModal()

  const handleDownloadPDF = () => {
    if (!documentRef.current) return;

    html2pdf()
      .set({ margin: 10, filename: 'act-of-issue.pdf', html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4' } })
      .from(documentRef.current)
      .save();
  };

  return (
    <div className={styles.wrapper}>
      <div ref={documentRef} className={styles.inner}>
        <div className={styles.number}></div>
        <div className={styles.info}>
          <IssueActContent />
        </div>
        <div className={styles.signatures}>
          <div className={styles.item}>
            <div className={styles.user}>
            {issueUser?.firstNameRu}  {issueUser?.lastNameRu}
            </div>
            <div className={styles.pic} onClick={() => {
              openModal('signature', {
                maxWidth: 400,
                role: 'issuer'
               })
            }}>
            {<img src={issuerSignature || ''} alt="" />}
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.user}>
            {receiverUser?.firstNameRu}  {receiverUser?.lastNameRu}
            </div>
            <div className={styles.pic} onClick={() => {
              openModal('signature', {
                maxWidth: 400,
                 role: 'receiver'
               })
            }}>
            {<img src={receiverSignature || ''} alt="" />}
            </div>
          </div>

        </div>
      </div>

      <div className="text-right mt-6 max-w-3xl mx-auto">
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Завершить выдачу
        </button>
      </div>
    </div>
  );
};

export default DocumentWithSignatures;
