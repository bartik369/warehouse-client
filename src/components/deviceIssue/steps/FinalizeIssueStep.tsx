import { IoCheckboxOutline } from 'react-icons/io5';
import { TbBookDownload } from 'react-icons/tb';

import BtnAction from '@/components/ui/buttons/BtnAction';
import { useIssueContext } from '@/features/issue/context/IssueContext';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { partnerUser } from '@/store/slices/userSlice';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { COLORS } from '@/utils/constants/ui/colors';
import { MESSAGES } from '@/utils/constants/ui/messages';
import { SIZES } from '@/utils/constants/ui/sizes';

import styles from './Steps.module.scss';

const FinalizeIssueStep = () => {
  const { state } = useIssueContext();
  const recipient = useAppSelector(partnerUser);

  const handleDownload = async () => {
    try {
      if (!state.pdfBlob) return;

      const url = URL.createObjectURL(state.pdfBlob);
      window.open(url);

      const a = document.createElement('a');
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
