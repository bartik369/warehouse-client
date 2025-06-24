import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BtnAction from '../../ui/buttons/BtnAction';
import { useAppSelector } from '../../../hooks/redux/useRedux';
import { RootState } from '../../../store/store';
import {useLogoutUserMutation} from '../../../store/api/authApi';
import { useOutsideClick } from '../../../hooks/data/useOutsideClick';
import { profileMenuData } from '../../../utils/data/menus';
import { BUTTON_LABELS } from '../../../utils/constants/ui/buttons';
import { handleApiError } from '../../../utils/errors/handleApiError';
import { LuCircleUser } from 'react-icons/lu';
import { TbLogout2 } from "react-icons/tb";
import styles from './ProfileMenu.module.scss';

const ProfileMenu = () => {
    const user = useAppSelector((state:RootState) => state.auth.user);
    const navigate = useNavigate();
    const [logout] = useLogoutUserMutation();
    const { isOpen, openModalHandler, modalRef } = useOutsideClick();
    
     const logoutHandler = async () => {
       if (!user) return;
       try {
         await logout(user.id).unwrap();
         navigate("/");
       } catch (err: unknown) {
         handleApiError(err);
       }
     };

    return (
      <div className={styles.content} ref={modalRef}>
        <button className={styles.icon} onClick={openModalHandler}>
          <LuCircleUser />
        </button>
        <div className={isOpen ? styles.menu : styles.hidden}>
          <div className={styles.username}>
            {user && `${user.firstNameEn} ${user.lastNameEn}`}
          </div>
          <nav>
            <ul>
              {profileMenuData.map((item) => (
                <li key={item.id} onClick={openModalHandler}>
                  <Link to={item.path}>
                  <item.icon
                        className={styles.icon}
                        aria-label={item.title}
                    />
                  {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.logout}>
            <BtnAction
              color="light"
              title={BUTTON_LABELS.signout}
              size="md"
              icon={<TbLogout2 />}
              click={logoutHandler}
            />
          </div>
        </div>
      </div>
    );
};

export default ProfileMenu;