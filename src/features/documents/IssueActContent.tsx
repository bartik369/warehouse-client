import DeviceTable from '../../components/tables/DeviceTable';
import { useAppSelector } from '../../hooks/redux/useRedux';
import { currentUser } from '../../store/slices/authSlice';
import { partnerUser } from '../../store/slices/userSlice';
import styles from './Document.module.scss';

const IssueActContent = () => {
  const issueUser = useAppSelector(currentUser);
  const receiveUser = useAppSelector(partnerUser);
    return (
      <>
        <h2 className={styles.number}>Акт выдачи №1234</h2>
        <p> {
            `ООО «Компания Х», в лице директора Иванова Алексея Ивановича, действующего на основании устава, именуемое в дальнейшем ${issueUser?.firstNameRu} ${issueUser?.lastNameRu}, и ООО «Фирма У», в лице генерального директора Сидорова Анатолия Сергеевича,  действующего на основании устава, именуемое в дальнейшем ${receiveUser.firstNameRu} ${receiveUser.lastNameRu} подписали настоящий акт приема передачи на основании договора №123456789
            `
          }
        </p>
        <DeviceTable />
      </>
    );
  };
  

export default IssueActContent;