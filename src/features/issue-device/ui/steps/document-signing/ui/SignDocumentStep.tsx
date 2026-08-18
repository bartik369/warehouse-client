import { User } from '@/entities/user/model/types';
import { generateIssuePdfFile } from '@/features/issue-device/document/generateIssuePdfFile';
import { IssueState } from '@/features/issue-device/model/issueTypes';
import { IssueActions } from '@/features/issue-device/model/useIssue';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { formatDate } from '@/shared/lib/date/formatDate';

import { StepLayout } from '../../layout/StepLayout';
import { DocumentSignatures } from './document-signatures/DocumentSignatures';
import { IssueDocument } from './issue-document/IssueDocument';

interface SignDocumentStepProps {
  issueState: IssueState;
  user: User | null;
  actions: IssueActions;
  isIssueLoading: boolean;
  onDelete: (id: string) => void;
}

export const SignDocumentStep = ({
  actions,
  issueState,
  user,
  isIssueLoading,
}: SignDocumentStepProps) => {
  const signatureState = useAppSelector((state) => state.signature);
  const currentUser = useAppSelector((state) => state.auth.user);
  const isNextDisabled = !signatureState.issuer.signature || !signatureState.receiver.signature;

  const generatePdf = () => {
    if (!user || !currentUser) return null;

    return generateIssuePdfFile({
      date: formatDate(new Date(), 'date'),
      docNumber: issueState.issueNumber,
      tableData: issueState.assignedDevices,
      firstNameRuCurrent: currentUser.firstNameRu ?? '',
      lastNameRuCurrent: currentUser.lastNameRu ?? '',
      firstNameRuPartner: user.firstNameRu ?? '',
      lastNameRuPartner: user.lastNameRu ?? '',
      issuerSignature: signatureState.issuer.signature,
      receiverSignature: signatureState.receiver.signature,
      issuerSignedAt: signatureState.issuer.time,
      receiverSignedAt: signatureState.receiver.time,
    });
  };

  const handleComplete = async () => {
    const file = await generatePdf();

    if (!file) return;

    await actions.handleCompleteProcess(file);
  };

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
      loading={isIssueLoading}
      onNext={handleComplete}
      onBack={actions.handleBackStep}
    />
  );
};
