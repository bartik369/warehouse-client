import { useLocation } from 'react-router-dom';

import BurgerBtn from '@/components/ui/buttons/burger/BurgerBtn';
import { useStickyHeader } from '@/hooks/data/useStickyHeader';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { RootState } from '@/store/store';
import { Breadcrumbs } from '@/widgets/breadcrumbs/ui/Breadcrumbs';

import { HeaderActions } from '../HeaderActions/HeaderActions';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import styles from './Header.module.scss';

interface HeaderProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

export const Header = ({ isActive, setIsActive }: HeaderProps) => {
  const location = useLocation();
  const { isSticky } = useStickyHeader();
  const isDevicePage = /^\/devices\/[a-f0-9-]+$/.test(location.pathname);
  const isDeviceLocationsList = /^\/devices\/locations\/[^/]+$/.test(location.pathname);
  const selectedDevices = useAppSelector((state: RootState) => state.issue.selectedDevices);
  const hasSelectedDevices = selectedDevices.length > 0;
  const areSelectedDevicesAssigned = selectedDevices[0]?.isAssigned;
  const shouldShowHeaderActions = isDevicePage || (isDeviceLocationsList && hasSelectedDevices);

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : styles.relative}`}>
      <div className={styles.left}>
        <BurgerBtn isActive={isActive} action={() => setIsActive(!isActive)} />
        <div className={styles.breadcrumbsWrap}>
          <Breadcrumbs />
        </div>
        <Search />
      </div>
      <div className={styles.right}>
        {shouldShowHeaderActions && (
          <HeaderActions
            isDevicePage={isDevicePage}
            hasSelection={hasSelectedDevices}
            isAssigned={areSelectedDevicesAssigned}
          />
        )}
        <Profile />
      </div>
    </header>
  );
};
