import { department, email, login, workID } from '../../utils/constants/constants';
import TechnicalOptions from '../ui/options/TechnicalOptions';
import { useIssueContext } from '../../features/issue/context/IssueContext';
import { location } from '../../utils/constants/device';
import styles from './UserInfo.module.scss';

const UserInfo = () => {
  const { state } = useIssueContext();
  return (
    <section className={styles.user}>
      <h2 className={styles.name}>
        {state.user?.firstNameRu} {state.user?.lastNameRu}
      </h2>
      <div className={styles.extName}>
        {state.user?.firstNameEn} {state.user?.lastNameEn}
      </div>
      <div className={styles.info}>
        <TechnicalOptions name={email} value={state.user?.email ?? ""} />
        <TechnicalOptions
          name={login}
          value={state.user?.userName ?? ""}
        />
        <TechnicalOptions name={workID} value={state.user?.workId ?? ""} />
        <TechnicalOptions name={department} value={state.user?.department ?? ""} />
        <TechnicalOptions name={location} value={state.user?.location ?? ""} />
      </div>
    </section>
  );
};

export default UserInfo;
