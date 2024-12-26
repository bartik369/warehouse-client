import {FC, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux/useRedux';
import {useLogoutUserMutation} from '../../../store/api/authApi';
import { profileMenuData } from '../../../utils/data/menus';
import { signout } from '../../../utils/constants/constants';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../../helpers/error-handling';
import profileIcon from '../../../assets/elements/profile-icon.svg'
import style from './ProfileMenu.module.scss';
import { useOutsideClick } from '../../../hooks/data/useOutsideClick';
import BtnAction from '../../ui/buttons/BtnAction';


const ProfileMenu:FC = () => {
    const user = useAppSelector(store => store.auth.user);
    const navigate = useNavigate();
    const [logout] = useLogoutUserMutation();
    const { isOpen, openModalHandler, modalRef } =  useOutsideClick();
    
     const logoutHandler = async () => {
      console.log('click')
      try {
        await logout(user.id).unwrap();
        navigate("/");
      } catch (err) {

        if (isFetchBaseQueryError(err)) {
          const errMsg = "error" in err ? err.error : JSON.stringify(err.data);
          console.log(errMsg);
        } else if (isErrorWithMessage(err)) {
          console.log(err);
        }
      }
    };

    return (
        <div className={style.content} ref={modalRef}>
            <button className={style.icon} onClick={openModalHandler}>
                <img src={profileIcon} alt="" />
            </button>
            <div className={isOpen
                ? style.menu 
                : style.hidden
                }
                >
            <div className={style.username}>
                {user && `${user.firstName} ${user.lastName}`}
            </div>
            <nav>
                <ul>
                    {profileMenuData.map(item => 
                        <li key={item.id}>
                            <Link to={item.path}>{item.title}</Link>
                        </li>
                    )}
                </ul>
            </nav>
            <div className={style.logout}>
                <BtnAction 
                    title={signout} 
                    click={logoutHandler} 
                    type={'button'} 
                    color={'grey'} 
                />
            </div>
            </div>
        </div>
    );
};

export default ProfileMenu;