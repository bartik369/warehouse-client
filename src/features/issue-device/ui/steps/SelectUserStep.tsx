import { Empty } from 'antd';
import { BsCheck } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';

import BtnAction from '@/components/ui/buttons/BtnAction';
import { IssueState } from '@/features/issue-device/model/issueTypes';
import { useAppSelector } from '@/hooks/redux/useRedux';
import Search from '@/shared/ui/search/Search';
import { RootState } from '@/store/store';
import { BaseIssueQuery } from '@/types/issue';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { COLORS } from '@/utils/constants/ui/colors';
import { PLACEHOLDER_LABELS } from '@/utils/constants/ui/placeholders';

import UserInfo from '../../../../components/deviceIssue/user/UserInfo';
import UsersList from '../../../../components/deviceIssue/user/UsersList';
import styles from './Steps.module.scss';

interface SelectUserStepProps {
  state: IssueState;
  isSuccess: boolean;
  isFetching: boolean;
  userChange: (value: string) => void;
  resetUserQuery: () => void;
  setUser: (id: string) => Promise<void>;
  resetUser: () => void;
  nextStep: () => void;
}
export const SelectUserStep = ({
  state,
  isSuccess,
  isFetching,
  userChange,
  resetUserQuery,
  setUser,
  resetUser,
  nextStep,
}: SelectUserStepProps) => {
  const user = useAppSelector((state: RootState) => state.user.user);

  return (
    <div className={styles.inner}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Search
          placeholder={PLACEHOLDER_LABELS.userSearch}
          actions={{
            handleChange: userChange,
            handleReset: resetUserQuery,
          }}
          value={state.userQuery}
          name="email"
        />
        {state.isUsersListVisible && isSuccess && state.wasSearched && (
          <div className={styles.result}>
            <UsersList
              isSuccess={isSuccess}
              isFetching={isFetching}
              state={state}
              setUser={setUser}
            />
          </div>
        )}
      </form>
      {user?.id ? (
        <>
          <UserInfo />
          <div className={styles.actions}>
            <BtnAction
              icon={<GrFormClose />}
              size="lg"
              color={COLORS.grey}
              title={BUTTON_LABELS.reset}
              click={resetUser}
            />
            <BtnAction
              icon={<BsCheck />}
              size="lg"
              color={COLORS.orange}
              title={BUTTON_LABELS.select}
              click={nextStep}
            />
          </div>
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};
