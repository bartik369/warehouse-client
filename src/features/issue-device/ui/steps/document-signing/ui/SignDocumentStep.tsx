import { User } from '@/entities/user/model/types';
import { DocumentWithSignatures } from '@/features/documents/DocumentWithSignatures';
import { IssueState } from '@/features/issue-device/model/issueTypes';
import { IssueActions } from '@/features/issue-device/model/useIssue';
import { useAppSelector } from '@/hooks/redux/useRedux';

import { AssignedDevicesTable } from '../../../assigned-devices-table/AssignedDevicesTable';
import { StepLayout } from '../../layout/StepLayout';
import { DocumentSignatures } from './document-signatures/DocumentSignatures';
import { IssueDocument } from './issue-document/IssueDocument';

interface SignDocumentStepProps {
  issueState: IssueState;
  user: User | null;
  actions: IssueActions;
  isIssueLoading: boolean;
  onDelete: (id: string) => void;
  handleComplete: (file: Blob) => void;
}

export const SignDocumentStep = ({
  actions,
  issueState,
  user,
  isIssueLoading,
  onDelete,
  handleComplete,
}: SignDocumentStepProps) => {
  const signatureState = useAppSelector((rootState) => rootState.signature);
  const isNextDisabled = !signatureState.issuerSignature || !signatureState.receiverSignature;
  const left = (
    <IssueDocument devices={issueState.assignedDevices} user={user} state={issueState} />
  );
  const right = <DocumentSignatures user={user} />;
  return (
    <StepLayout
      left={left}
      right={right}
      currentStep={issueState.issueStep}
      disabledStep={isNextDisabled}
      leftWidth={750}
      onNext={actions.handleNextStep}
      onBack={actions.handleBackStep}
    />
  );
};
{
  /* <DocumentWithSignatures
  state={state}
  isIssueLoading={isIssueLoading}
  onDelete={onDelete}
  handleComplete={handleComplete}
/>; */
}
