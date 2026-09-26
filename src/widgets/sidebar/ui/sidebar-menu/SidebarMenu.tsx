import { useState } from 'react';

import { NavLink } from 'react-router-dom';

import { sidebarMenuData } from '../../model/sidebarMenuData';
import styles from './SidebarMenu.module.scss';

interface SidebarMenuProps {
  open: boolean;
}

const SidebarMenu = ({ open }: SidebarMenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleMouseEnter = (id: number) => {
    setHoveredItem(id);
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
              to={item.path}
              className={({ isActive }) =>
                `${styles.menuItemHeader} ${isActive ? styles.activeMenu : ''}`
              }
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <span className={!open ? styles.icon : styles.openIcon}>
                {item.icon && <item.icon className={styles.icon} aria-label={item.title} />}
              </span>

              {open && <div className={styles.item}>{item.title}</div>}

              {!open && hoveredItem === item.id && <div className={styles.title}>{item.title}</div>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarMenu;
