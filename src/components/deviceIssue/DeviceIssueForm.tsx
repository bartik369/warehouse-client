import { useEffect } from "react";
import DeviceIssueSteps from "./DeviceIssueSteps";
import Steps from "../ui/steps/Steps";
import Loader from "../ui/loader/Loader";
import { useAppSelector } from "../../hooks/redux/useRedux";
import { useGlobalModal } from "../../hooks/data/useGlobalModal";
import { useIssueContext } from "../../features/issue/context/IssueContext";
import { RootState } from "../../store/store";
import styles from './DeviceIssueForm.module.scss'

const DeviceIssueForm = ({ issueId = null }) => {
  const {state, actions } = useIssueContext();
  const user = useAppSelector((state: RootState) => state.user.user);
  const { openModal } = useGlobalModal();

  useEffect(() => {
    if (issueId) actions.handleDeviceIssue(issueId);
  }, [issueId]);

  useEffect(() => {
    if (state.step === 'sign_document') {
      openModal('signature', {
       title: 'Акт',
       maxWidth: 1000,
      })
    }
  }, [state.step])

  useEffect(() => {
    return () => { actions.handleFullReset(); };
  }, []);

  if (!state.step && !user) return <Loader size="sm" color="green" />

  return (
    <section className={styles.inner}>
      <h1 className={styles.title}>{state.title}</h1>
      <div className={styles.info}>
      <DeviceIssueSteps />
      </div>
      <Steps />
     </section>
  );
};

export default DeviceIssueForm;
