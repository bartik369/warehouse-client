import { DocumentWithSignatures } from '@/features/documents/DocumentWithSignatures';
import { IssueState } from '@/features/issue-device/model/issueTypes';

interface SignDocumentStepProps {
  state: IssueState;
  isIssueLoading: boolean;
  deleteDevice: (id: string) => void;
  handleComplete: (file: Blob) => void;
}

export const SignDocumentStep = ({
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
