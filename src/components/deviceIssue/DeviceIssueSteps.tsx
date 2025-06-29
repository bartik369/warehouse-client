import { useIssueContext } from "@/features/issue/context/IssueContext";
import SelectUserStep from "./steps/SelectUserStep";
import ReviewDocumentStep from "./steps/ReviewDocumentStep";
import SignDocumentStep from "./steps/SignDocumentStep";
import SelectWarehouseStep from "./steps/SelectWarehouseStep";
import FinalizeIssueStep from "./steps/FinalizeIssueStep";

const DeviceIssueSteps = () => {
  const { 
    state,
    actions,
    isSuccess, 
    isFetching
  } = useIssueContext();

  switch (state.step) {
    case "select_warehouse":
     return (
      <SelectWarehouseStep actions={actions} />
     )
    case "select_user":
      return (
        <SelectUserStep
          isSuccess={isSuccess}
          isFetching={isFetching}
          actions={actions}
        />
      );
    case "review_document":
      return (
        <ReviewDocumentStep actions={actions} />
      );
    case "sign_document":
      return <SignDocumentStep />;
    case "send_document":
      return <FinalizeIssueStep />
    default:
      return <div></div>;
  }
};

export default DeviceIssueSteps;
