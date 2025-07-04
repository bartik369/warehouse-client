import { useEffect } from "react";
import DeviceIssueSteps from "./DeviceIssueSteps";
import Steps from "../ui/steps/Steps";
import Loader from "../ui/loader/Loader";
import { useAppSelector } from "@/hooks/redux/useRedux";
import { useIssueContext } from "@/features/issue/context/IssueContext";
import { RootState } from "@/store/store";
import { steps } from "@/features/issue/model/issueReducer";
import styles from './DeviceIssueForm.module.scss'

const DeviceIssueForm = ({ issueId = null }) => {
  const { state, actions } = useIssueContext();
  const user = useAppSelector((state: RootState) => state.user.user);

  useEffect(() => {
    return () => { actions.handleFullReset(); };
  }, []);

  if (!state.step && !user) return <Loader size="sm" color="green" />
  const currentStep = steps.indexOf(state.step)

  return (
    <section className={styles.inner}>
      <h1 className={styles.title}><span>{currentStep + 1}</span>{state.title}</h1>
      <div className={styles.info}>
      <DeviceIssueSteps />
      </div>
      <Steps />
     </section>
  );
};

export default DeviceIssueForm;
