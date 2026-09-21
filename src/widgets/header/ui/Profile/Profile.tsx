import { Divider, Flex } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

import { useOutsideClick } from '@/hooks/data/useOutsideClick';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { Button } from '@/shared/ui/button/Button';
import { useLogoutUserMutation } from '@/store/api/authApi';
import { RootState } from '@/store/store';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { handleApiError } from '@/utils/errors/handleApiError';

import { profileMenuData, systemMenuData } from '../../model/menuData';
import styles from './Profile.module.scss';

export const Profile = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [logout] = useLogoutUserMutation();
  const { isOpen, toggleModalHandler, modalRef } = useOutsideClick();

  const logoutHandler = async () => {
    if (!user) return;
    try {
      await logout(user.id).unwrap();
      navigate('/');
    } catch (err: unknown) {
      handleApiError(err);
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.content} ref={modalRef}>
        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={isOpen}
          onClick={toggleModalHandler}
        >
          <IoSettingsOutline className={styles.icon} />
          <span>Панель управления</span>
        </button>
        {isOpen && (
          <div className={styles.menu}>
            <Flex className={styles.userInfo}>
              <div className={styles.icon}>
                <AiOutlineUser />
              </div>
              {user && (
                <div className={styles.user}>
                  <div className={styles.name}>
                    {user.lastNameEn} {user.firstNameEn}
                  </div>
                  <div className={styles.email}>{user.email}</div>
                </div>
              )}
            </Flex>
            <Divider style={{ margin: '10px 0px 15px' }} />
            <div className={styles.block}>
              <div className={styles.mainTitle}>Управление системой</div>
              <nav className={styles.navigation}>
                <ul>
                  {systemMenuData.map((item) => (
                    <li key={item.id}>
                      <Link to={item.path} className={styles.link} onClick={toggleModalHandler}>
                        <item.icon className={styles.icon} />
                        <div className={styles.info}>
                          <span className={styles.title}>{item.title}</span>
                          <span className={styles.subtitle}>{item.subtitle}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <Divider style={{ margin: '10px 0px' }} />
            <div className={styles.block}>
              <div className={styles.mainTitle}>Мой аккаунт</div>
              <nav className={styles.navigation}>
                <ul>
                  {profileMenuData.map((item) => (
                    <li key={item.id}>
                      <Link to={item.path} className={styles.link} onClick={toggleModalHandler}>
                        <item.icon className={styles.icon} />
                        <div className={styles.info}>
                          <span className={styles.title}>{item.title}</span>
                          <span className={styles.subtitle}>{item.subtitle}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className={styles.logout}>
              <Button
                icon={<RiLogoutBoxLine />}
                iconSize={15}
                type="button"
                size="sm"
                title={BUTTON_LABELS.signout}
                onClick={logoutHandler}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
