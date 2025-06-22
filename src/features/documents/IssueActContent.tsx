import DeviceTable from '../../components/tables/DeviceTable';
import { useAppSelector } from '../../hooks/redux/useRedux';
import { currentUser } from '../../store/slices/authSlice';

const IssueActContent = () => {
  const issueUser = useAppSelector(currentUser);
    return (
      <>
        <h1 className="text-xl font-bold text-center mb-4">Акт выдачи №1234</h1>
        <p className="mb-4"> {
            `Настоящим подтверждается, что ${issueUser?.firstNameRu} ${issueUser?.lastNameRu} пользователь получил следующие устройства и ознакомлен с правилами использования...`
          }
        </p>
        <DeviceTable />
      </>
    );
  };
  

export default IssueActContent;