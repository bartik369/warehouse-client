import BtnAction from "../../ui/buttons/BtnAction";
import { useAppSelector } from "../../../hooks/redux/useRedux";
import { useIssueContext } from "../../../features/issue/context/IssueContext";
import { partnerUser } from "../../../store/slices/userSlice";
import { pdfBlob } from "../../../store/slices/signatureSlice";
import { SIZES } from "../../../utils/constants/ui/sizes";
import { COLORS } from "../../../utils/constants/ui/colors";
import { MESSAGES } from "../../../utils/constants/ui/messages";
import { BUTTON_LABELS } from "../../../utils/constants/ui/buttons";
import { TbBookDownload } from "react-icons/tb";
import { IoCheckboxOutline } from "react-icons/io5";
import styles from "./Steps.module.scss";

const FinalizeIssueStep = () => {
  const { state } = useIssueContext();
  const recipient = useAppSelector(partnerUser);
  const pdfFile = useAppSelector(pdfBlob);

  const handleDownload = async () => {
    try {
      if (!pdfFile) return;

      const url = URL.createObjectURL(pdfFile);
      window.open(url);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${state.deviceIssueData?.processId}.pdf`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.doneProcess}>
      <div className={styles.icon}>
        <IoCheckboxOutline />
      </div>
      <div className={styles.info}>
        <header className={styles.header}>
          {MESSAGES.document}
          <span>{state.deviceIssueData.processId}</span>
          {MESSAGES.formed}
        </header>
        <div className={styles.text}>
          {MESSAGES.documentSent} <span>{recipient.email}</span>
        </div>
      </div>
      <BtnAction
        size={SIZES.md}
        color={COLORS.darkGrey}
        click={handleDownload}
        title={BUTTON_LABELS.download}
        icon={<TbBookDownload />}
      />
    </div>
  );
};

export default FinalizeIssueStep;
