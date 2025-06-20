import DeviceIssueForm from '../../deviceIssue/DeviceIssueForm';
import { IssueProvider } from '../../../features/issue/context/IssueContext';
import { useAppSelector } from '../../../hooks/redux/useRedux';
import { RootState } from '../../../store/store';
const Issue = () => {
    const deviceId = useAppSelector((state: RootState) => state.device.device.id);
    return (
        <IssueProvider initialDeviceId={deviceId || ''}>
            <DeviceIssueForm />
        </IssueProvider>
    );
};

export default Issue;