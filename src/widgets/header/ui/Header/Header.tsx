import { useLocation } from 'react-router-dom';

import BurgerBtn from '@/components/ui/buttons/burger/BurgerBtn';
import { useStickyHeader } from '@/hooks/data/useStickyHeader';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { RootState } from '@/store/store';

import HeaderMenu from '../Menu/HeaderMenu';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import styles from './Header.module.scss';

interface HeaderProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

const Header = ({ isActive, setIsActive }: HeaderProps) => {
  const location = useLocation();
  const { isSticky } = useStickyHeader();
  const isDevicePage = /^\/devices\/[a-f0-9-]+$/.test(location.pathname);
  const isSelectedDevices =
    useAppSelector((state: RootState) => state.issue.assignedDevices).length > 0;

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : styles.relative}`}>
      <BurgerBtn isActive={isActive} action={() => setIsActive(!isActive)} />
      <div className={styles.searchBlock}>
        <Search />
      </div>
      <div className={styles.menuBlock}>
        {(isDevicePage || isSelectedDevices) && <HeaderMenu />}
      </div>
      <Profile />
    </header>
  );
};

export default Header;
