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
  const [visible, setVisible] = useState(false);
  const [subVisible, setSubVisible] = useState(false)

  useEffect(() => {
    !open && setVisible(false);
  }, [open]);

  const displayHandler = () => {
    setVisible(!visible);
  };

  return (
    <nav className={style.nav}>
      <ul>
        {sidebarMenuData && sidebarMenuData.map((item) => (
            <li key={item.id} 
              onMouseEnter={() => (item.subMenu && !open) && setVisible(true)}
              onMouseLeave={() => (item.subMenu && !open) &&  setVisible(false)}>
              <div className={open ? style.item : style.closed}>
                 {(item.subMenu && !open)
                  ?  <img className={style.icon} src={item.icon} alt=""/>
                  : open
                  ? <img className={style.icon} src={item.icon} alt=""/>
                  : <Link to={item.path}>
                      <img className={style.icon} src={item.icon} alt=""/>
                    </Link>
                 }
                  <div className={!open ? style.hidden : style.item}>
                    {item.subMenu
                      ? <div className={style.title}>{item.title}</div>
                      : <Link to={item.path}>
                          {item.title}
                        </Link>
                   }
                  </div>
                {item.subMenu && (
                  <div className={open ? style.arrow : style.hidden}>
                    {visible 
                      ? <FontAwesomeIcon icon={faChevronUp} onClick={displayHandler} />
                      : <FontAwesomeIcon icon={faChevronDown} onClick={displayHandler} />
                    }
                  </div>
                )}
              </div>
              {item.subMenu && 
              <div className={(!open && visible) ? style['sub-hover'] : ''}>
              <SubMenu item={item} visible={visible} open={open}/>
              </div>
              }
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default SidebarMenu;





// return (
//   <nav className={style.nav}>
//     <ul>
//       {sidebarMenuData && sidebarMenuData.map((item) => (
//           <li key={item.id}>
//             <div className={open ? style.item : style.closed}>
//               <Link className={style.group} to={item.url}>
//                 <img className={style.icon} src={item.icon} alt="" />
//                 <div className={!open ? style.hidden : style.item}>
//                   {item.title}
//                 </div>
//               </Link>
//               {item.subMenu && (
//                 <div className={open ? style.arrow : style.hidden}>
//                   {visible 
//                     ? <FontAwesomeIcon icon={faChevronUp} onClick={displayHandler} />
//                     : <FontAwesomeIcon icon={faChevronDown} onClick={displayHandler} />
//                   }
//                 </div>
//               )}
//             </div>
//             {item.subMenu && <SubMenu item={item} visible={visible} />}
//           </li>
//         ))}
//     </ul>
//   </nav>
// );




