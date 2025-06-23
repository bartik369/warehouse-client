import IssueActContent from "./IssueActContent";
import { useAppSelector } from "../../hooks/redux/useRedux";
import { currentUser } from "../../store/slices/authSlice";
import { partnerUser } from "../../store/slices/userSlice";
import { useState, useEffect } from "react";
import {
  selectIssuerSignature,
  selectReceiverSignature,
} from "../../store/slices/signatureSlice";
import { usePDF } from "react-to-pdf";
import styles from "./Document.module.scss";
import BtnAction from "../../components/ui/buttons/BtnAction";
import { IoBarcodeOutline } from "react-icons/io5";
import { TbBookDownload } from "react-icons/tb";
import { MdOutlineDone } from "react-icons/md";
import { actNumberTitle, download, issue } from "../../utils/constants/constants";
import Signatures from "./Signatures";
import { generateActNumber } from "../../utils/nums/generateActNumber";

const DocumentWithSignatures = () => {
  const { toPDF, targetRef } = usePDF({ filename: "act-of-issue.pdf" });
  const issuerSignature = useAppSelector(selectIssuerSignature);
  const receiverSignature = useAppSelector(selectReceiverSignature);
  const issueUser = useAppSelector(currentUser);
  const receiverUser = useAppSelector(partnerUser);
  const [actNumber, setActNumber] = useState('');
  const date = new Date();

  useEffect(() => {
    setActNumber(generateActNumber());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div ref={targetRef} className={styles.innerWrapper}>
        <div className={styles.logo}>
          <IoBarcodeOutline className={styles.icon} />
          <span>ITAM</span>
        </div>
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.number}>
            <span>{actNumberTitle}</span>{actNumber}
            </div>
            <time className={styles.date} dateTime={date.toISOString()}>
              {date.toLocaleDateString("ru-RU")}
            </time>
          </header>
          <div className={styles.info}>
            <IssueActContent />
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
          size="md"
          color="dark-grey"
          click={() => toPDF()}
          title={download}
          icon={<TbBookDownload />}
        />
        <BtnAction
          size="md"
          color="dark-green"
          click={() => console.log("fdfds")}
          title={issue}
          icon={<MdOutlineDone />}
        />
      </div>
    </div>
  );
};

export default DocumentWithSignatures;
