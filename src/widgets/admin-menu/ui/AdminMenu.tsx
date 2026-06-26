import { useState } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

import { adminMenu } from '../model/adminMenu';
import styles from './AdminMenu.module.scss';

const AdminMenu = () => {
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const toggleSubmenu = (id: number) => {
    setOpenSubmenu(id === openSubmenu ? null : id);
  };
  return (
    <div className={styles.menu}>
      <nav>
        <ul>
          {adminMenu.map((item) => {
            const isCurrentActive = location.pathname === item.path;
            const isSubmenuActive = item.subMenu?.some(
              (subItem) => location.pathname === subItem.path
            );
            return (
              <li key={item.id}>
                <NavLink
                  onClick={() => toggleSubmenu(item.id)}
                  to={!item.subMenu ? item.path : '#'}
                  className={isCurrentActive || isSubmenuActive ? styles.active : styles.default}
                >
                  <div className={styles.icon}>
                    <item.icon />
                  </div>
                  {item.title}
                  {item.subMenu && (
                    <span className={styles.submenuToggle}>
                      {openSubmenu === item.id ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                  )}
                </NavLink>

                {item.subMenu && openSubmenu === item.id && (
                  <ul className={styles.submenu}>
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.id}>
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) =>
                            isActive ? styles.submenuActive : styles.submenuDefault
                          }
                        >
                          {subItem.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AdminMenu;
