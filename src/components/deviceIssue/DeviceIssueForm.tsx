import { useEffect } from "react";
import { DeviceIssueProvider } from "./context/DeviceIssueContext";
import DeviceIssueSteps from "./DeviceIssueSteps";
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

  if (!state.step && !state.user) return <div>spiner</div>;

  return (
    <DeviceIssueProvider state={state} dispatch={dispatch}>
      <DeviceIssueSteps
        isFetching={isFetching}
        isSuccess={isSuccess}
        actions={actions}
      />
    </DeviceIssueProvider>
  );
};

export default DeviceIssueForm;
