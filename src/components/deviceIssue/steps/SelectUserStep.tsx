import UsersList from '../UsersList';
import UserInfo from '../UserInfo';
import BtnAction from '../../ui/buttons/BtnAction';
import { useDeviceIssueContext } from '../context/DeviceIssueContext';
import { IBaseUserQuery } from '../../../types/user';
import { placeholderUserSearch, reset, select } from '../../../utils/constants/constants';
import { CgCloseO } from 'react-icons/cg';
import { BsCheck } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import styles from './Steps.module.scss';

interface ISelectUserStepProps {
  isSuccess: boolean;
  isFetching: boolean;
  actions: IBaseUserQuery;
}

const SelectUserStep = ({
  isSuccess,
  isFetching,
  actions,
}: ISelectUserStepProps) => {
  const { state } = useDeviceIssueContext();
  return (
    <div className={styles.inner}>
      <form className={styles.form}>
        <div className={styles.input}>
          <input
            value={state.query}
            type="text"
            placeholder={placeholderUserSearch}
            onChange={(e) => actions.handleInputChange("email", e.target.value)}
          />
          {state.query.length > 0 && (
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
      {state.user?.email && (
        <>
          <UserInfo />
          <div className={styles.actions}>
            <BtnAction
              icon={<GrFormClose />}
              size="lg"
              color="grey"
              title={reset}
              click={actions.handleReset}
            />
            <BtnAction
              icon={<BsCheck />}
              size="lg"
              color="dark-green"
              title={select}
              click={actions.handleSetStepInfo}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SelectUserStep;
