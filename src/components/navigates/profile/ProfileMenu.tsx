import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BtnAction from '../../ui/buttons/BtnAction';
import { useAppSelector } from '../../../hooks/redux/useRedux';
import {useLogoutUserMutation} from '../../../store/api/authApi';
import { useOutsideClick } from '../../../hooks/data/useOutsideClick';
import { profileMenuData } from '../../../utils/data/menus';
import { signout } from '../../../utils/constants/constants';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../../utils/errors/error-handling';
import { LuCircleUser } from 'react-icons/lu';
import style from './ProfileMenu.module.scss';

const ProfileMenu = () => {
    const user = useAppSelector(store => store.auth.user);
    const navigate = useNavigate();
    const [logout] = useLogoutUserMutation();
    const { isOpen, openModalHandler, modalRef } = useOutsideClick();
    
     const logoutHandler = async () => {
      try {
        await logout(user?.id).unwrap();
        navigate('/');
      } catch (err) {

        if (isFetchBaseQueryError(err)) {
            const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
            console.log('API Error:', errMsg);
          } else if (isErrorWithMessage(err)) {
            console.error('Unexpected Error:', err.message);
          } else {
            console.error('Unknown Error:', err);
          }
      }
    };

    return (
        <div className={style.content} ref={modalRef}>
            <button className={style.icon} onClick={openModalHandler}>
                <LuCircleUser />
            </button>
            <div className={isOpen
                ? style.menu 
                : style.hidden
                }
                >
            <div className={style.username}>
                {user && `${user.firstNameEn} ${user.lastNameEn}`}
            </div>
            <nav>
                <ul>
                    {profileMenuData.map(item => 
                        <li key={item.id} onClick={openModalHandler}>
                            <Link to={item.path}>{item.title}</Link>
                        </li>
                    )}
                </ul>
            </nav>
            <div className={style.logout}>
            <BtnAction color="green" title={signout} size="md" click={logoutHandler}/>
            </div>
            </div>
        </div>
    );
};

export default ProfileMenu;