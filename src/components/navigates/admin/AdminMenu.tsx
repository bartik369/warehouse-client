import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { adminMenu } from '@/utils/data/menus';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import styles from './AdminMenu.module.scss';

const AdminMenu = () => {
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const toggleSubmenu = (id: number) => {
    setOpenSubmenu(id === openSubmenu ? null : id);
  };
  const handleMouseEnter = (index: number) => {
    setHoveredItem(index);
  };
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  
  return (
    <div className={styles.menu}>
      <nav>
        <ul>
          {adminMenu.map((item) => {
            const isCurrentActive = location.pathname === item.path;
            const isSubmenuActive = item.subMenu?.some((subItem) => location.pathname === subItem.path
            );
            return (
              <li key={item.id}>
                <NavLink
                  onClick={() => toggleSubmenu(item.id)}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  to={!item.subMenu ? item.path : "#"}
                  className={
                    isCurrentActive || isSubmenuActive ? styles.active : styles.default
                  }
                >
                  <div className={styles.icon}>
                    <item.icon />
                  </div>
                  {item.title}
                  {item.subMenu && (
                    <span className={styles["submenu-toggle"]}>
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
                            isActive ? styles["submenu-active"] : styles["submenu-default"]
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

