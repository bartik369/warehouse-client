import HeaderMenu from '../navigates/header/HeaderMenu';
import Search from '../search/Search';
import BurgerBtn from '../ui/buttons/burger/BurgerBtn';
import Profile from '../profile/Profile';
import { useAppSelector } from '../../hooks/redux/useRedux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useStickyHeader } from '../../hooks/data/useStickyHeader';
import style from './Header.module.scss';
import { EquipmentProvider } from '../../shared/context/EquipmentContext';

interface HeaderProps {
  isActive: boolean;
  setIsActive: (isActive:boolean) => void;
};

const Header = ({ isActive, setIsActive }:HeaderProps) => {
  const device = useAppSelector((state:RootState) => state.device.device);
  const status = useAppSelector((state:RootState) => state.device.status);
  const location = useLocation();
  const isDevicePage = /^\/devices\/[a-f0-9-]+$/.test(location.pathname);
  const {isSticky} = useStickyHeader();
  
    return (
      <header className={`${style.header} ${isSticky 
        ? style.sticky 
        : style.relative}`} >
          <BurgerBtn isActive={isActive} action={() => setIsActive(!isActive)}/>
          <Search />
        {device && (status || isDevicePage) && 
        <EquipmentProvider>
          <HeaderMenu device={device} />
        </EquipmentProvider>
        }
        <Profile />
      </header>
    )
};

export default Header;