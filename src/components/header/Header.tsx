import { FC } from 'react';
import HeaderMenu from '../navigates/header/HeaderMenu';
import style from './Header.module.scss';
import Search from '../search/Search';
import BurgerBtn from '../ui/buttons/burger/BurgerBtn';
import Profile from '../profile/Profile';

interface IHeaderProps {
  isActive: boolean;
  setIsActive: (isActive:boolean) => void;
}

const Header:FC<IHeaderProps> = ({isActive, setIsActive}) => {
    return (
      <header className={style.header}>
        <BurgerBtn isActive={isActive} action={() => setIsActive(!isActive)}/>
        <HeaderMenu />
        <Search />
        <Profile />
      </header>
    );
};

export default Header;