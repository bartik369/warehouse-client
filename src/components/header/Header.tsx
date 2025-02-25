import { FC} from 'react';
import HeaderMenu from '../navigates/header/HeaderMenu';
import Search from '../search/Search';
import { useAppSelector } from '../../hooks/redux/useRedux';
import { useLocation } from 'react-router-dom';
import BurgerBtn from '../ui/buttons/burger/BurgerBtn';
import Profile from '../profile/Profile';
import { useStickyHeader } from '../../hooks/data/useStickyHeader';
import style from './Header.module.scss';
import { RootState } from '../../store/store';


interface IHeaderProps {
  isActive: boolean;
  setIsActive: (isActive:boolean) => void;
};

const Header:FC<IHeaderProps> = ({isActive, setIsActive}) => {
  const device = useAppSelector((state:RootState) => state.device.device);
  const status = useAppSelector((state:RootState) => state.device.status);
  const location = useLocation();
  const isDevicePage = /^\/devices\/[a-f0-9-]+$/.test(location.pathname);

  const {isSticky} = useStickyHeader();

    return (
      <header  className={`${style.header} ${isSticky 
        ? style.sticky 
        : style.relative}`} >
        <BurgerBtn isActive={isActive} action={() => setIsActive(!isActive)}/>
        <Search />
        {/* {status && <HeaderMenu device={device} />} */}
        {(status || isDevicePage) && <HeaderMenu device={device} />}
        <Profile />
      </header>
    )
};

export default Header;