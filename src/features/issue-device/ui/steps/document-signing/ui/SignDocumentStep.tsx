import { DocumentWithSignatures } from '@/features/documents/DocumentWithSignatures';
import { IssueState } from '@/features/issue-device/model/issueTypes';

interface SignDocumentStepProps {
  state: IssueState;
  isIssueLoading: boolean;
  onDelete: (id: string) => void;
  handleComplete: (file: Blob) => void;
}

export const SignDocumentStep = ({
  state,
  isIssueLoading,
  onDelete,
  handleComplete,
}: SignDocumentStepProps) => {
  return (
    <>
      <DocumentWithSignatures
        state={state}
        isIssueLoading={isIssueLoading}
        onDelete={onDelete}
        handleComplete={handleComplete}
      />
    </>
  );
};
