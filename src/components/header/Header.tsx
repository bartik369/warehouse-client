import { useEffect, useState, FC } from 'react';
import { useLogoutUserMutation } from '../../store/api/authApi';
import { useAppSelector } from '../../hooks/redux/useRedux';
import { useNavigate } from 'react-router-dom';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../helpers/error-handling';
import HeaderMenu from '../navigates/header/HeaderMenu';
import style from './Header.module.scss';
import Search from '../search/Search';
import ProfileMenu from '../navigates/profile/ProfileMenu';
import BurgerBtn from '../ui/buttons/burger/BurgerBtn';

interface IHeaderProps {
  isActive: boolean;
  setIsActive: (isActive:boolean) => void;
}

const Header:FC<IHeaderProps> = ({isActive, setIsActive}) => {
    const navigate = useNavigate();
    const user = useAppSelector((store) => store.auth.user);
    const [logout] = useLogoutUserMutation();

    // const logoutHandler = async () => {
    //   try {
    //     await logout(user.id).unwrap();
    //     navigate("/");
    //   } catch (err) {
    //     if (isFetchBaseQueryError(err)) {
    //       const errMsg = "error" in err ? err.error : JSON.stringify(err.data);
    //       console.log(errMsg);
    //     } else if (isErrorWithMessage(err)) {
    //       console.log(err);
    //     }
    //   }
    // };
    return (
      <header className={style.header}>
        <BurgerBtn isActive={isActive} action={() => setIsActive(!isActive)}/>
        <HeaderMenu />
        <Search />
        <ProfileMenu />
        {/* <button onClick={logoutHandler}>Test logout</button> */}
      </header>
    );
};

export default Header;