import DeviceTable from '@/components/tables/DeviceTable';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { currentUser } from '@/store/slices/authSlice';
import { partnerUser } from '@/store/slices/userSlice';
import { BaseIssueQuery } from '@/types/issue';

import { IssueState } from '../issue/model/issueTypes';

interface IssueActContentProps {
  state: IssueState;
  deleteDevice: (id: string) => void;
}

const IssueActContent = ({ state, deleteDevice }: IssueActContentProps) => {
  const issueUser = useAppSelector(currentUser);
  const receiveUser = useAppSelector(partnerUser);
  return (
    <>
      <p>
        ООО «Компания Х», в лице директора Иванова Алексея Ивановича, действующего на основании
        устава, именуемое в дальнейшем{' '}
        <strong>
          {issueUser?.firstNameRu} {issueUser?.lastNameRu}
        </strong>
        , и ООО «Фирма У», в лице генерального директора Сидорова Анатолия Сергеевича, действующего
        на основании устава, именуемое в дальнейшем{' '}
        <strong>
          {receiveUser.firstNameRu} {receiveUser.lastNameRu}
        </strong>{' '}
        подписали настоящий акт приема передачи на основании договора №123456789
      </p>
      <DeviceTable state={state} deleteDevice={deleteDevice} />
    </>
  );
};

export default IssueActContent;
