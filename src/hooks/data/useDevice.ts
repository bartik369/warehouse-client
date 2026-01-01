import { RootState } from '@/store/store';
import { accept, deviceInfo, issue, move } from '@/utils/constants/device';
import { deviceActionsMenu } from '@/utils/data/menus';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/useRedux';

export const useDevice = () => {
  const navigate = useNavigate();
  const device = useAppSelector((state: RootState) => state.device.device);
  const { isAssigned } = device || {};
  const isDevicePage = /^\/devices\/[a-f0-9-]+$/.test(location.pathname);

  const filteredMenu = deviceActionsMenu.filter((item) => {
    //   if (isAssigned) {
    //     return !isDevicePage
    //     ? [accept, deviceInfo].includes(item.title)
    //     : [accept].includes(item.title)
    // } else {
    //   return isDevicePage
    //   ?  [move, issue].includes(item.title)
    //   :  item.title !== accept
    // }
    if (isAssigned) {
      return [accept].includes(item.title);
    } else {
      return isDevicePage ? [move, issue].includes(item.title) : item.title !== accept;
    }
  });

  const handleDeviceAction = (item: any) => {
    switch (item.title) {
      case deviceInfo:
        navigate(`/devices/${device?.id}`);
        break;
      case accept:
        console.log('prinyat');
        break;
      case move:
        console.log('peremestit');
        break;
      case issue:
        navigate(`/issue/create-issue`);
        break;
    }
  };

  return { filteredMenu, handleDeviceAction };
};
