import IssueActContent from "./IssueActContent";
import { useAppSelector } from "../../hooks/redux/useRedux";
import { currentUser } from "../../store/slices/authSlice";
import { partnerUser } from "../../store/slices/userSlice";
import { useState, useEffect } from "react";
import {
  selectIssuerSignature,
  selectReceiverSignature,
} from "../../store/slices/signatureSlice";
import styles from "./Document.module.scss";
import BtnAction from "../../components/ui/buttons/BtnAction";
import { IoBarcodeOutline } from "react-icons/io5";
import { TbBookDownload } from "react-icons/tb";
import { MdOutlineDone } from "react-icons/md";
import { actNumberTitle, download, issue } from "../../utils/constants/constants";
import Signatures from "./Signatures";
import { generateActNumber } from "../../utils/nums/generateActNumber";
import { useIssueContext } from "../issue/context/IssueContext";
import { pdf } from "@react-pdf/renderer";
import IssueDocument from "../../components/pdf/issue/IssueDocument";

const DocumentWithSignatures = () => {
  const { actions, state } = useIssueContext();
  const issuerSignature = useAppSelector(selectIssuerSignature);
  const receiverSignature = useAppSelector(selectReceiverSignature);
  const issueUser = useAppSelector(currentUser);
  const receiverUser = useAppSelector(partnerUser);
  const [actNumber, setActNumber] = useState('');
  const date = new Date();

  // ✅ Генерация PDF Blob
  const generatePDFBlob = async (): Promise<Blob> => {
    const doc = (
      <IssueDocument
        date={date.toLocaleDateString('Ru-ru')}
        docNumber={actNumber}
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
    return blob;
  };

  // ✅ Скачать PDF
  const handleDownload = async () => {
    try {
      const blob = await generatePDFBlob();
      const url = URL.createObjectURL(blob);
      window.open(url);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'act-of-issue.pdf';
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Ошибка при генерации PDF:", err);
    }
  };

  // ✅ Отправка PDF через контекст
  const handleSend = async () => {
    try {
      const blob = await generatePDFBlob();
      actions.handleDeviceIssue(actNumber, blob); // Здесь должна быть ваша функция отправки
    } catch (err) {
      console.error("Ошибка при отправке PDF:", err);
    }
  };

  useEffect(() => {
    setActNumber(generateActNumber());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
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
          click={handleDownload}
          title={download}
          icon={<TbBookDownload />}
        />
        <BtnAction
          size="md"
          color="dark-green"
          click={handleSend}
          title={issue}
          icon={<MdOutlineDone />}
        />
      </div>
    </div>
  );
};

export default DocumentWithSignatures;
