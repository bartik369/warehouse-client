import TechnicalOptions from '@/components/ui/options/TechnicalOptions';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { RootState } from '@/store/store';
import { LABELS } from '@/utils/constants/ui/labels';
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
        <TechnicalOptions name={LABELS.email} value={user.email ?? ""} />
        <TechnicalOptions
          name={LABELS.login}
          value={user.userName ?? ""}
        />
        <TechnicalOptions name={LABELS.workID} value={user.workId ?? ""} />
        <TechnicalOptions name={LABELS.department} value={user.department ?? ""} />
        <TechnicalOptions name={LABELS.location} value={user.location ?? ""} />
      </div>
    </section>
  );
};

export default UserInfo;
