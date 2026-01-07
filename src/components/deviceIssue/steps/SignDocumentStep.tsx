import React from 'react';

import DocumentWithSignatures from '@/features/documents/DocumentWithSignatures';
import { IssueState } from '@/features/issue/model/issueTypes';
import { BaseDeviceQuery } from '@/types/devices';

interface SignDocumentStepProps {
  actions: BaseDeviceQuery;
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
