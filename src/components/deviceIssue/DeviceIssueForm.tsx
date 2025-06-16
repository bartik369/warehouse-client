import { useEffect } from "react";
import DeviceIssueSteps from "./DeviceIssueSteps";
import Steps from "../ui/steps/Steps";
import Loader from "../ui/loader/Loader";
import { useGlobalModal } from "../../hooks/data/useGlobalModal";
import { useIssueContext } from "../../features/issue/context/IssueContext";

const DeviceIssueForm = ({ issueId = null }) => {
  const {state, actions, isFetching, isSuccess } = useIssueContext()
  const { updateModalProps } = useGlobalModal();

  useEffect(() => {
    if (issueId) actions.handleDeviceIssue(issueId);
  }, [issueId]);

  useEffect(() => {
    updateModalProps(state.step);
  }, [state.step]);

  if (!state.step && !state.user) return <Loader size="sm" color="green" />


  return (
    <>
      <DeviceIssueSteps
        isFetching={isFetching}
        isSuccess={isSuccess}
        actions={actions}
      />
      <Steps />
      </>
  );
};

export default DeviceIssueForm;
