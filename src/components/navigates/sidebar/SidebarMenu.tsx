import {FC, useState} from 'react';
import SubMenu from './SubMenu';
import { Link } from 'react-router-dom';
import { sidebarMenuData } from '../../../utils/data/menus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import style from './SidebarMenu.module.scss';

interface ISidebarMenuProps {
    open: boolean;
};

const SidebarMenu: FC<ISidebarMenuProps> = ({ open }) => {
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);        
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);       

  const toggleSubmenu = (id: number) => {
    setOpenSubmenu(id === openSubmenu ? null : id)
  };
  const handleMouseEnter = (index: any) => {
    setHoveredItem(index);
  };
  const handleMouseLeave = () => {
    setHoveredItem(null);
  }

  return (
    <nav>
      <ul className={style.content}>
        {sidebarMenuData.map((item) => (
          <li key={item.id} className={style["menu-item"]}>
            <div className={`${style["menu-item-header"]} ${
                item.subMenu ? style["has-submenu"] : ""}`}
              onClick={() => item.subMenu && toggleSubmenu(item.id)}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <span className={!open ? style.icon : style['open-icon']}>
                {!item.subMenu 
                  ? <Link to={item.path}><img src={item.icon} alt="" /></Link>
                  : <img src={item.icon} alt="" />
                }
              </span>
              {(!open && hoveredItem === item.id && !item.subMenu) &&
                <div className={style.title}>
                    <Link to={item.path}>{item.title}</Link>
                </div>
              }
              {(open && !item.subMenu)
                ? <Link to={item.path}>{item.title}</Link>
                : open && item.subMenu 
                ? <div className={style['sub-title']}>{item.title}</div>
                : ""
              }
              {(!open && hoveredItem === item.id && item.subMenu) && (
                <div className={style['submenu-closed']}>
                  <SubMenu title={item.title} item={item} open={open} />
                </div>
              )}
              {item.subMenu && open && (
                <span className={style["submenu-toggle"]}>
                  {openSubmenu === item.id 
                  ? <FontAwesomeIcon icon={faChevronUp} />
                  : <FontAwesomeIcon icon={faChevronDown} />
                  }
                </span>
              )}
            </div>
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





