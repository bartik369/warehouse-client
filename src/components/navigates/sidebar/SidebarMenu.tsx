import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SubMenu from './SubMenu';
import { sidebarMenuData } from '../../../utils/data/menus';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import styles from './SidebarMenu.module.scss';

interface ISidebarMenuProps {
  open: boolean;
}

const SidebarMenu = ({ open }:ISidebarMenuProps) => {
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
    <nav>
      <ul className={styles.content}>
        {sidebarMenuData.map((item) => (
          <li key={item.id} className={styles.menuItem}>
            <NavLink
              to={item.subMenu ? "" : item.path}
              className={({ isActive }) =>
                `${styles.menuItemHeader} ${
                  isActive
                    ? styles.activeMenu
                    : item.subMenu
                    ? styles.hasSubmenu
                    : ""
                }`
              }
              onClick={() => item.subMenu && toggleSubmenu(item.id)}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <span className={!open ? styles.icon : styles.openIcon}>
                {!item.subMenu
                  ? item.icon && (
                      <item.icon
                        className={styles.icon}
                        aria-label={item.title}
                      />
                    )
                  : item.icon && (
                      <item.icon
                        className={styles.icon}
                        aria-label={item.title}
                      />
                    )}
              </span>
              {!open && hoveredItem === item.id && !item.subMenu && (
                <div className={styles.title}>{item.title}</div>
              )}
              {open && !item.subMenu ? (
                <div className={styles.item}>{item.title}</div>
              ) : open && item.subMenu ? (
                <div className={styles.subTitle}>{item.title}</div>
              ) : (
                ""
              )}
              {!open && hoveredItem === item.id && item.subMenu && (
                <div className={styles.closedSubmenu}>
                  <SubMenu title={item.title} item={item} open={open} />
                </div>
              )}
              {item.subMenu && open && (
                <span className={styles.toggleSubmenu}>
                  {openSubmenu === item.id ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              )}
            </NavLink>
            {openSubmenu === item.id && item.subMenu && open && (
              <SubMenu title={item.title} item={item} open={open} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarMenu;
