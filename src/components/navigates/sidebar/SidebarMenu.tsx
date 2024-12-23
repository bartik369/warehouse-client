import {FC, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { sidebarMenuData } from '../../../utils/data/menus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import style from './SidebarMenu.module.scss';
import SubMenu from './SubMenu';

interface ISidebarMenuProps {
    open: boolean;
};
const SidebarMenu: FC<ISidebarMenuProps> = ({ open }) => {

  const [openSubmenu, setOpenSubmenu] = useState(null);        
  const [hoveredItem, setHoveredItem] = useState(null);       

  const toggleSubmenu = (index: any) => {
    setOpenSubmenu(index === openSubmenu ? null : index)
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
        {sidebarMenuData.map((item, index) => (
          <li key={index} className={style["menu-item"]}>
            <div className={`${style["menu-item-header"]} ${
                item.subMenu ? style["has-submenu"] : ""}`}
              onClick={() => item.subMenu && toggleSubmenu(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <span className={!open ? style.icon : style['open-icon']}>
                {!item.subMenu 
                  ? <Link to={item.path}><img src={item.icon} alt="" /></Link>
                  : <img src={item.icon} alt="" />
                }
              </span>
              {(!open && hoveredItem === index && !item.subMenu) &&
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
              {(!open && hoveredItem === index && item.subMenu) && (
                <div className={style['submenu-closed']}>
                  <SubMenu item={item} open={open} />
                </div>
              )}
              {item.subMenu && open && (
                <span className={style["submenu-toggle"]}>
                  {openSubmenu === index 
                  ? <FontAwesomeIcon icon={faChevronUp} />
                  : <FontAwesomeIcon icon={faChevronDown} />
                  }
                </span>
              )}
            </div>
            {openSubmenu === index && item.subMenu && open && (
              <SubMenu item={item} open={open} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
  
};

export default SidebarMenu;





