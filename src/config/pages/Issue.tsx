import Issue from "../../components/pages/issue/Issue";
import { IssueProvider } from "../../features/issue/context/IssueContext";
import { useAppSelector } from "../../hooks/redux/useRedux";
import { RootState } from "../../store/store";

const IssueWrapper = () => {
  const deviceId = useAppSelector((state: RootState) => state.device.device.id);
  return (
    <IssueProvider initialDeviceId={deviceId || ''}>
      <Issue />
    </IssueProvider>
  );
};

const IssueConfig = {
  title: 'Issue',
  path: '/issue',
  element: <IssueWrapper />,
  requireAuth: true,
}

export default IssueConfig;
