import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { useStickyHeader } from '@/shared/hooks/useStickyHeader';
import { BurgerBtn } from '@/shared/ui/burger-button/BurgerBtn';
import { RootState } from '@/store/store';
import { PageLayoutWidth } from '@/widgets/app-layout/model/types';
import { Breadcrumbs } from '@/widgets/breadcrumbs/ui/Breadcrumbs';

import { HeaderActions } from '../HeaderActions/HeaderActions';
import { Profile } from '../Profile/Profile';
import styles from './Header.module.scss';

interface HeaderProps {
  layoutWidth: PageLayoutWidth;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

export const Header = ({ layoutWidth, isActive, setIsActive }: HeaderProps) => {
  const location = useLocation();
  const { isSticky } = useStickyHeader();

  const isDevicePage = /^\/devices\/[a-f0-9-]+$/.test(location.pathname);
  const isDeviceLocationsList = /^\/devices\/locations\/[^/]+$/.test(location.pathname);

  const selectedDevices = useAppSelector((state: RootState) => state.issue.selectedDevices);

  const hasSelectedDevices = selectedDevices.length > 0;
  const areSelectedDevicesAssigned = selectedDevices[0]?.isAssigned;

  const shouldShowHeaderActions = isDevicePage || (isDeviceLocationsList && hasSelectedDevices);

  return (
    <header
      className={clsx(
        styles.header,
        isSticky ? styles.sticky : styles.relative,
        styles[layoutWidth]
      )}
    >
      <div className={styles.left}>
        <BurgerBtn isActive={isActive} action={() => setIsActive(!isActive)} />

        <div className={styles.breadcrumbsWrap}>
          <Breadcrumbs />
        </div>
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
