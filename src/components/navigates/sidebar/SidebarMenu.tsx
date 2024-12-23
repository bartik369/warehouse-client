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

  const toggleSubmenu = (index: any) => setOpenSubmenu(index === openSubmenu ? null : index);
  const handleMouseEnter = (index: any) => setHoveredItem(index);
  const handleMouseLeave = () => setHoveredItem(null);

  return (
    <nav>
      <ul className={style['sidebar-content']}>
        {sidebarMenuData.map((item, index) => (
          <Link to={item.path}>
          <li key={index} className={style['menu-item']}>
            <div
              className={`${style['menu-item-header']} ${item.subMenu ? style['has-submenu'] : ''}`}
              onClick={() => item.subMenu && toggleSubmenu(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <span className={style.icon}>
                <img src={item.icon} alt="" />
              </span>
              {(!open && hoveredItem === index)
               ? <span className={style['item-name']}>
                    <Link to={item.path}>
                      {item.title}
                    </Link>
                </span>
                : open 
                ? item.title
                : ''
            }
            { (!open && hoveredItem === index && item.subMenu)
                ? <div className={style.test}>
                   <SubMenu item={item} open={open}/>
                  </div>
                : ''}
              {item.subMenu && open &&(
                <span className={style['submenu-toggle']}>
                  {openSubmenu === index 
                    ? <FontAwesomeIcon icon={faChevronUp} />
                    : <FontAwesomeIcon icon={faChevronDown} />
                  }
                </span>
              )}
            </div>
            {openSubmenu === index && item.subMenu && open && (
              <SubMenu item={item} open={open}/>
            )}
          </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
  
};

export default SidebarMenu;





