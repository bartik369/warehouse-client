import DocumentWithSignatures from '@/features/documents/DocumentWithSignatures';
import { IssueState } from '@/features/issue/model/issueTypes';
import { BaseIssueQuery } from '@/types/issue';

interface SignDocumentStepProps {
  state: IssueState;
  isIssueLoading: boolean;
  deleteDevice: (id: string) => void;
  handleComplete: (file: Blob) => void;
}

const SignDocumentStep = ({
  state,
  isIssueLoading,
  deleteDevice,
  handleComplete,
}: SignDocumentStepProps) => {
  return (
    <>
      <DocumentWithSignatures
        state={state}
        isIssueLoading={isIssueLoading}
        deleteDevice={deleteDevice}
        handleComplete={handleComplete}
      />
    </>
  );
};

export default SignDocumentStep;
