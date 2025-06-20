import UsersList from '../user/UsersList';
import UserInfo from '../user/UserInfo';
import BtnAction from '../../ui/buttons/BtnAction';
import { useIssueContext } from '../../../features/issue/context/IssueContext';
import { BaseUserQuery } from '../../../types/user';
import { useAppSelector } from '../../../hooks/redux/useRedux';
import { placeholderUserSearch, reset, select } from '../../../utils/constants/constants';
import { CgCloseO } from 'react-icons/cg';
import { BsCheck } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import styles from './Steps.module.scss';
import { RootState } from '../../../store/store';

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
        <div className={styles.input}>
          <input
            value={state.userQuery}
            type="text"
            placeholder={placeholderUserSearch}
            onChange={(e) => actions.handleUserChange("email", e.target.value)}
          />
          {state.userQuery.length > 0 && (
            <CgCloseO className={styles.icon} onClick={actions.handleReset} />
          )}
        </div>
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
      {user?.email && (
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
      )}
    </div>
  );
};

export default SelectUserStep;
