import { useEffect } from "react";
import DeviceIssueSteps from "./DeviceIssueSteps";
import Steps from "../ui/steps/Steps";
import Loader from "../ui/loader/Loader";
import { DeviceIssueProvider } from "./context/DeviceIssueContext";
import { useDeviceIssue } from "../../hooks/data/useDeviceIssue";
import { useGlobalModal } from "../../hooks/data/useGlobalModal";

const DeviceIssueForm = ({ issueId = null }) => {
  const {
    state,
    isFetching,
    isSuccess,
    actions,
    dispatch,
  } = useDeviceIssue();
  const { updateModalProps } = useGlobalModal();

  useEffect(() => {
    if (issueId) actions.handleDeviceIssue(issueId);
  }, [issueId]);

  useEffect(() => {
    updateModalProps(state.step);
  }, [state.step]);

  if (!state.step && !state.user) return <Loader size="sm" color="green" />

  return (
    <DeviceIssueProvider state={state} dispatch={dispatch}>
      <DeviceIssueSteps
        isFetching={isFetching}
        isSuccess={isSuccess}
        actions={actions}
      />
      <Steps />
    </DeviceIssueProvider>
  );
};

export default DeviceIssueForm;
