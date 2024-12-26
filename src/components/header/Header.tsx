import { FC} from 'react';
import HeaderMenu from '../navigates/header/HeaderMenu';
import Search from '../search/Search';
import BurgerBtn from '../ui/buttons/burger/BurgerBtn';
import Profile from '../profile/Profile';
import { useStickyHeader } from '../../hooks/data/useStickyHeader';
import style from './Header.module.scss';

interface IHeaderProps {
  isActive: boolean;
  setIsActive: (isActive:boolean) => void;
};

const Header:FC<IHeaderProps> = ({isActive, setIsActive}) => {
  const {isSticky} = useStickyHeader();
    return (
      <header  className={`${style.header} ${isSticky 
        ? style.sticky 
        : style.relative}`} >
        <BurgerBtn isActive={isActive} action={() => setIsActive(!isActive)}/>
        <HeaderMenu />
        <Search />
        <Profile />
      </header>
    )
};

export default Header;