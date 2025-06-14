import { useDeviceIssueContext } from './context/DeviceIssueContext';
import SelectUserStep from './steps/SelectUserStep';
import ReviewDocumentStep from './steps/ReviewDocumentStep';
import SignDocumentStep from './steps/SignDocumentStep';
import { IBaseUserQuery } from '../../types/user';

interface IDeviceIssueStepsProps {
    isSuccess: boolean;
    isFetching: boolean;
    actions: IBaseUserQuery;
}

const DeviceIssueSteps = ({ isSuccess, isFetching, actions }: IDeviceIssueStepsProps) => {
    const { state } = useDeviceIssueContext();
    switch (state.step) {
        case 'select_user':
            return <SelectUserStep 
            isSuccess={isSuccess} 
            isFetching={isFetching} 
            actions={actions}
            />
        case 'review_document':
            return <ReviewDocumentStep />
        case 'sign_document':
            return <SignDocumentStep />
        default:
            return <div>ffs</div>
    }
};

export default DeviceIssueSteps;