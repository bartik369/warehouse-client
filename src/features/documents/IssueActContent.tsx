import { User } from '@/entities/user/model/types';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { currentUser } from '@/store/slices/authSlice';
import { partnerUser } from '@/store/slices/userSlice';

interface IssueActContentProps {
  user: User | null;
}
const IssueActContent = ({ user }: IssueActContentProps) => {
  const issueUser = useAppSelector(currentUser);
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
          {user?.firstNameRu} {user?.lastNameRu}
        </strong>{' '}
        подписали настоящий акт приема передачи на основании договора №123456789
      </p>
    </>
  );
};

export default IssueActContent;
