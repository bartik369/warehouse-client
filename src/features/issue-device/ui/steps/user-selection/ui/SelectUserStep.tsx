import { Empty } from 'antd';

import { IssueState } from '@/features/issue-device/model/issueTypes';
import { IssueActions, IssueStatus, IssueUser } from '@/features/issue-device/model/useIssue';
import { UserAutocomplete } from '@/shared/ui/user-autocomplete/UserAutocomplete';

import { UserInfo } from '../../../user-info/UserInfo';
import { StepLayout } from '../../layout/StepLayout';

interface SelectUserStepProps {
  user: IssueUser;
  state: IssueState;
  actions: IssueActions;
}
export const SelectUserStep = ({ state, actions, user }: SelectUserStepProps) => {
  const isNextDisabled = !user.data.selectedUser; // todo  чекнуть

  const left = (
    <UserAutocomplete
      loading={user.status.isUsersLoading}
      onSearch={user.actions.handleChange}
      onOptionSelect={user.actions.handleSelect}
      searched={user.data.wasSearched}
      value={user.data.query}
      options={user.data.options}
    />
  );
  const right = user.data.selectedUser ? <UserInfo user={user.data.selectedUser} /> : null;

  return (
    <StepLayout
      left={left}
      right={right}
      currentStep={state.issueStep}
      disabledStep={isNextDisabled}
      leftWidth={550}
      onNext={actions.handleNextStep}
      onBack={actions.handleBackStep}
    />
  );
};
