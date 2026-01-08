import DocumentWithSignatures from '@/features/documents/DocumentWithSignatures';
import { IssueState } from '@/features/issue/model/issueTypes';
import { BaseIssueQuery } from '@/types/issue';

interface SignDocumentStepProps {
  actions: BaseIssueQuery;
  state: IssueState;
}

const SignDocumentStep = ({ actions, state }: SignDocumentStepProps) => {
  return (
    <>
      <DocumentWithSignatures actions={actions} state={state} />
    </>
  );
};

export default SignDocumentStep;
