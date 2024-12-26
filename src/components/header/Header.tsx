import { FC} from 'react';
import HeaderMenu from '../navigates/header/HeaderMenu';
import Search from '../search/Search';
import BurgerBtn from '../ui/buttons/burger/BurgerBtn';
import Profile from '../profile/Profile';
import style from './Header.module.scss';

interface IHeaderProps {
  isActive: boolean;
  setIsActive: (isActive:boolean) => void;
  isSticky: boolean;
};

const Header:FC<IHeaderProps> = ({isActive, setIsActive, isSticky}) => {
    return (
      <header  className={`${style.header} ${isSticky 
        ? style.sticky 
        : style.relative}`} >
        <BurgerBtn isActive={isActive} action={() => setIsActive(!isActive)}/>
        <HeaderMenu />
        <Search />
        <Profile />
      </header>
    );
};

export default Header;