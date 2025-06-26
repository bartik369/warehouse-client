import IssueActContent from "./IssueActContent";
import IssueDocument from "../../components/pdf/issue/IssueDocument";
import BtnAction from "../../components/ui/buttons/BtnAction";
import Signatures from "./Signatures";
import EnvelopeLoader from "../../components/ui/loader/envelope/EnvelopeLoader";
import { useIssueContext } from "../issue/context/IssueContext";
import { useAppSelector } from "../../hooks/redux/useRedux";
import { currentUser } from "../../store/slices/authSlice";
import { partnerUser } from "../../store/slices/userSlice";
import { selectIssuerSignature, selectReceiverSignature } from "../../store/slices/signatureSlice";
import { ELEMENTS_LABELS } from "../../utils/constants/ui/elements";
import { pdf } from "@react-pdf/renderer";
import { IoBarcodeOutline } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { BUTTON_LABELS } from "../../utils/constants/ui/buttons";
import { SECTION_TITLES } from "../../utils/constants/ui/titles";
import { COLORS } from "../../utils/constants/ui/colors";
import { SIZES } from "../../utils/constants/ui/sizes";
import styles from "./Document.module.scss";

const DocumentWithSignatures = () => {
  const { actions, state, isIssueLoading } = useIssueContext();
  const issuerSignature = useAppSelector(selectIssuerSignature);
  const receiverSignature = useAppSelector(selectReceiverSignature);
  const issueUser = useAppSelector(currentUser);
  const receiverUser = useAppSelector(partnerUser);
  const date = new Date();

  const generatePDFBlob = async (): Promise<Blob> => {
    const doc = (
      <IssueDocument
        date={date.toLocaleDateString('Ru-ru')}
        docNumber={ state.deviceIssueData?.processId || '' }
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

  const handleSend = async () => {
    try {
      const blob = await generatePDFBlob();
      actions.handleCreateIssue(blob);
    } catch (err) {
      console.error("Ошибка при отправке PDF:", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      {isIssueLoading && 
      <div className={styles.loader}>
        <EnvelopeLoader />
      </div>}
      <div className={styles.innerWrapper}>
        <div className={styles.logo}>
          <IoBarcodeOutline className={styles.icon} />
          <span>{ELEMENTS_LABELS.logoText}</span>
        </div>
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.number}>
              <span>{SECTION_TITLES.actIssueTitle}</span>{state.deviceIssueData?.processId}
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
        {/* <BtnAction
          size={SIZES.md}
          color={COLORS.darkGrey}
          click={handleDownload}
          title={BUTTON_LABELS.download}
          icon={<TbBookDownload />}
        /> */}
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
