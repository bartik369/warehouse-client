import IssueActContent from './IssueActContent';
import { useAppSelector } from '../../hooks/redux/useRedux';
import { currentUser } from '../../store/slices/authSlice';
import { partnerUser } from '../../store/slices/userSlice';
import { selectIssuerSignature, selectReceiverSignature } from '../../store/slices/signatureSlice';
import { usePDF } from 'react-to-pdf';
import styles from './Document.module.scss';
import BtnAction from '../../components/ui/buttons/BtnAction';
import { TbBookDownload } from "react-icons/tb";
import { MdOutlineDone } from "react-icons/md";
import { download, issue } from '../../utils/constants/constants';
import Signatures from './Signatures';

const DocumentWithSignatures = () => {
  const { toPDF, targetRef } = usePDF({ filename: 'act-of-issue.pdf' });
  const issuerSignature = useAppSelector(selectIssuerSignature);
  const receiverSignature = useAppSelector(selectReceiverSignature);
  const issueUser = useAppSelector(currentUser);
  const receiverUser = useAppSelector(partnerUser);

  return (
    <div className={styles.wrapper}>
      <div ref={targetRef} className={styles.innerWrapper}>
        <div className={styles.inner}>
        <div className={styles.number}></div>

        <div className={styles.info}>
          <IssueActContent />
        </div>
        <Signatures
          issuerSignature={issuerSignature}
          receiverSignature={ receiverSignature}
          issueUser={issueUser}
          receiverUser={receiverUser}
        />
      </div>
      </div>
      <div className={styles.actions}>
        <BtnAction 
        size='md' 
        color='dark-green' 
        click={() => toPDF()} 
        title={download}
        icon={<TbBookDownload />}
        />
         <BtnAction 
        size='md' 
        color='dark-green' 
        click={() => console.log('fdfds')} 
        title={issue} 
        icon={<MdOutlineDone />}
        />
      </div>
    </div>
  );
};

export default DocumentWithSignatures;
