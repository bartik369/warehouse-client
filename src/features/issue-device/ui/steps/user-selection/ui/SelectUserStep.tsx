import { IssueState } from '@/features/issue-device/model/issueTypes';
import { IssueActions, IssueUser } from '@/features/issue-device/model/useIssue';
import { UserAutocomplete } from '@/shared/ui/user-autocomplete/UserAutocomplete';

import { UserInfo } from '../../../user-info/UserInfo';
import { StepLayout } from '../../layout/StepLayout';

interface SelectUserStepProps {
  userController: IssueUser;
  issueState: IssueState;
  actions: IssueActions;
}
export const SelectUserStep = ({ issueState, actions, userController }: SelectUserStepProps) => {
  const isNextDisabled = !userController.data.currentUser?.id;

  console.log(userController.data.currentUser);

  const left = (
    <UserAutocomplete
      loading={userController.status.isUsersLoading}
      onSearch={userController.actions.handleChange}
      onOptionSelect={userController.actions.handleSelect}
      searched={userController.data.wasSearched}
      value={userController.data.query}
      options={userController.data.options}
    />
  );
  const right = userController.data.currentUser?.id ? (
    <UserInfo
      isLoading={userController.status.assignedDevicesLoading}
      user={userController.data.currentUser}
      assignedUserDevices={userController.data.assignedUserDevices}
    />
  ) : null;

  return (
    <StepLayout
      left={left}
      right={right}
      currentStep={issueState.issueStep}
      disabledStep={isNextDisabled}
      leftWidth={550}
      onNext={actions.handleNextStep}
      onBack={actions.handleBackStep}
    />
  );
};
