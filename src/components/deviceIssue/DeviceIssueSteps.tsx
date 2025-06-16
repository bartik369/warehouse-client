import { useIssueContext } from "../../features/issue/context/IssueContext";
import SelectUserStep from "./steps/SelectUserStep";
import ReviewDocumentStep from "./steps/ReviewDocumentStep";
import SignDocumentStep from "./steps/SignDocumentStep";
import { BaseUserQuery } from "../../types/user";

interface DeviceIssueStepsProps {
  isSuccess: boolean;
  isFetching: boolean;
  actions: BaseUserQuery;
}

const DeviceIssueSteps = ({
  isSuccess,
  isFetching,
  actions,
}: DeviceIssueStepsProps) => {
  const { state } = useIssueContext();
  switch (state.step) {
    case "select_user":
      return (
        <SelectUserStep
          isSuccess={isSuccess}
          isFetching={isFetching}
          actions={actions}
        />
      );
    case "review_document":
      return <ReviewDocumentStep />;
    case "sign_document":
      return <SignDocumentStep />;
    default:
      return <div></div>;
  }
};

export default DeviceIssueSteps;
