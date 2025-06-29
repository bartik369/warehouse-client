import UsersList from '../user/UsersList';
import UserInfo from '../user/UserInfo';
import BtnAction from '@/components/ui/buttons/BtnAction';
import Search from '@/components/deviceIssue/search/Search';
import NoData from '@/components/ui/no-data/NoData';
import { useIssueContext } from '@/features/issue/context/IssueContext';
import { BaseUserQuery } from '@/types/user';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { RootState } from '@/store/store';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { COLORS } from '@/utils/constants/ui/colors';
import { PLACEHOLDER_LABELS } from '@/utils/constants/ui/placeholders';
import { BsCheck } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import styles from './Steps.module.scss';

interface SelectUserStepProps {
  isSuccess: boolean;
  isFetching: boolean;
  actions: BaseUserQuery; 
}
const SelectUserStep = ({
  isSuccess,
  isFetching,
  actions,
}: SelectUserStepProps) => {
  const { state } = useIssueContext();
  const user = useAppSelector((state: RootState) => state.user.user);

  return (
    <div className={styles.inner}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Search
          placeholder={PLACEHOLDER_LABELS.userSearch} 
          actions={{
            handleChange: actions.handleUserChange,
            handleReset: actions.handleResetUserQuery
          }}
          value={state.userQuery}
          name='email'
        />
        {(state.isUsersListVisible && isSuccess && state.wasSearched) && (
          <div className={styles.result}>
            <UsersList
              isSuccess={isSuccess}
              isFetching={isFetching}
              state={state}
              actions={actions}
            />
          </div>
      )}
      </form>
      {user?.id
       ? (
        <>
          <UserInfo />
          <div className={styles.actions}>
            <BtnAction
              icon={<GrFormClose />}
              size="lg"
              color={COLORS.grey}
              title={BUTTON_LABELS.reset}
              click={actions.handleResetUser}
            />
            <BtnAction
              icon={<BsCheck />}
              size="lg"
              color={COLORS.darkGreen}
              title={BUTTON_LABELS.select}
              click={actions.handleNextStep}
            />
          </div>
        </>
      )
      : <NoData />
    }
    </div>
  );
};

export default SelectUserStep;
