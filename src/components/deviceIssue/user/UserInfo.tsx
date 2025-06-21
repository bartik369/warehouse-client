import { department, email, login, workID } from '../../../utils/constants/constants';
import TechnicalOptions from '../../ui/options/TechnicalOptions';
import { useAppSelector } from '../../../hooks/redux/useRedux';
import { RootState } from '../../../store/store';
import { location } from '../../../utils/constants/device';
import styles from './UserInfo.module.scss';

const UserInfo = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  return (
    <section className={styles.user}>
      <h2 className={styles.name}>
        {user.firstNameRu} {user.lastNameRu}
      </h2>
      <div className={styles.extName}>
        {user.firstNameEn} {user.lastNameEn}
      </div>
      <div className={styles.info}>
        <TechnicalOptions name={email} value={user.email ?? ""} />
        <TechnicalOptions
          name={login}
          value={user.userName ?? ""}
        />
        <TechnicalOptions name={workID} value={user.workId ?? ""} />
        <TechnicalOptions name={department} value={user.department ?? ""} />
        <TechnicalOptions name={location} value={user.location ?? ""} />
      </div>
    </section>
  );
};

export default UserInfo;
