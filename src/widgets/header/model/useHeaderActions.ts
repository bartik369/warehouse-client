import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/hooks/redux/useRedux';
import { RootState } from '@/store/store';

type HeaderActionKey = 'issue' | 'move' | 'accept' | 'info';
export const useHeaderActions = () => {
  const device = useAppSelector((state: RootState) => state.device.device);
  const navigate = useNavigate();
  const handleProcessRoute = (key: HeaderActionKey) => {
    switch (key) {
      case 'issue':
        navigate(`/issue/create-issue`);
        break;
      case 'move':
        console.log('issue');
        break;
      case 'accept':
        console.log('accept');
        break;
      case 'info':
        navigate(`/devices/${device?.id}`);
        break;
      default:
        break;
    }
  };
  return { handleProcessRoute };
};
