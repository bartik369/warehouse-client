import { deviceIssueSteps } from "@/utils/data/menus";
import { useIssueContext } from "@/features/issue/context/IssueContext";
import styles from "./Steps.module.scss";

const Steps = () => {
  const { state } = useIssueContext ();
  
  return (
    <div className={styles.stepsContainer}>
      {deviceIssueSteps?.map((step, index) => {
        const isActive = state.step === step.id;
        const isCompleted =
          deviceIssueSteps.findIndex((step) => step.id === state.step) > index;

        return (
          <div key={step.id} className={styles.step}>
            <div className={`${styles.circle} ${isActive 
              ? styles.active 
              : isCompleted 
              ? styles.completed 
              : ""
              }`}
            >
              {index + 1}
            </div>
            <div className={`${styles.label} ${ isActive ? styles.activeLabel : ""}`}>
              {step.label}
            </div>
            {index < deviceIssueSteps.length - 1 && (
              <div className={styles.line} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
