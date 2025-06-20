import { useIssueContext } from "../../features/issue/context/IssueContext";
import SelectUserStep from "./steps/SelectUserStep";
import ReviewDocumentStep from "./steps/ReviewDocumentStep";
import SignDocumentStep from "./steps/SignDocumentStep";
import SelectWarehouseStep from "./steps/SelectWarehouseStep";

const DeviceIssueSteps = () => {
  const { 
    state,
    actions,
    isSuccess, 
    isFetching, 
    isWarehousesFetching, 
    isWarehousesSuccess, 
    isDeviceFetching, 
    isDeviceSuccess 
  } = useIssueContext();

  switch (state.step) {
    case "select_warehouse":
     return (
      <SelectWarehouseStep
       actions={actions}
       isSuccess={isWarehousesSuccess}
       isFetching={isWarehousesFetching}
      />
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
        <ReviewDocumentStep
          isSuccess={isDeviceSuccess}
          isFetching={isDeviceFetching}
          actions={actions}
        />
      );
    case "sign_document":
      return <SignDocumentStep />;
    default:
      return <div></div>;
  }
};

export default DeviceIssueSteps;
