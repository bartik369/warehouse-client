import UsersList from '../user/UsersList';
import UserInfo from '../user/UserInfo';
import BtnAction from '../../ui/buttons/BtnAction';
import { useIssueContext } from '../../../features/issue/context/IssueContext';
import { BaseUserQuery } from '../../../types/user';
import { useAppSelector } from '../../../hooks/redux/useRedux';
import { placeholderUserSearch, reset, select } from '../../../utils/constants/constants';
import { BsCheck } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import styles from './Steps.module.scss';
import { RootState } from '../../../store/store';
import Search from '../search/Search';
import NoData from '../../ui/no-data/NoData';

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
      <form className={styles.form}>
        <Search
          placeholder={placeholderUserSearch} 
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
      {user?.email 
       ? (
        <>
          <UserInfo />
          <div className={styles.actions}>
            <BtnAction
              icon={<GrFormClose />}
              size="lg"
              color="grey"
              title={reset}
              click={actions.handleResetUser}
            />
            <BtnAction
              icon={<BsCheck />}
              size="lg"
              color="dark-green"
              title={select}
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
