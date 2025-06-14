import { IBaseUserQuery } from "../../../types/user";
import Actions from "../../forms/device/Actions";
import { useDeviceIssueContext } from "../context/DeviceIssueContext";
import UsersList from "../UsersList";
import styles from "./Steps.module.scss";

interface ISelectUserStepProps {
    isSuccess: boolean;
    isFetching: boolean;
    actions: IBaseUserQuery;
}

const SelectUserStep = ({ isSuccess, isFetching, actions }: ISelectUserStepProps) => {
 const { state } = useDeviceIssueContext();
  return (
    <div className={styles.search}>
        <div className={styles.input}>
          <input onChange={(e) => actions.handleInputChange('email', e.target.value)} type="text" />
          {state.isUsersListVisible && (
            <div className={styles.result}>
            <UsersList
              isSuccess={isSuccess}
              isFetching={isFetching}
              state={state}
            />
             </div>
          )}
        </div>
        <Actions
        resetEntity={actions.handleReset}
        addEntity={actions.handleSetUser}
        />
    </div>
  );
};

export default SelectUserStep;
