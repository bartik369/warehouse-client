import React, {FC, useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import { sidebarMenuData } from '../../../utils/data/menus';
import style from './SidebarMenu.module.scss'

const SidebarMenu:FC = () => {
    const [visible, setVisible] = useState(false)
    return (
      <nav className={style.nav}>
      <ul>
        {sidebarMenuData && sidebarMenuData.map((item) => (
            <li key={item.id}>
                {item.locations?.length
                ? <div>
                     <div className={style.item}>
                     <FontAwesomeIcon icon={item.icon} />
                     {item.title}
                     <div className={style.arrow}>
                         {visible
                         ? <FontAwesomeIcon icon={faChevronUp} onClick={() => setVisible(false)}/>
                         : <FontAwesomeIcon icon={faChevronDown} onClick={() => setVisible(true)}/>
                         }
                     </div>
                     </div>
                     <div className={!visible ? style.hidden : style.submenu}>
                        {item.locations.map((sub) => 
                            <li key={sub.id}>
                                <Link to={sub.url}>{sub.subTitle}</Link>
                            </li>
                        )}
                     </div>
                  </div>
                :  <div>
                     <FontAwesomeIcon icon={item.icon} />
                     <Link to={item.url}>{item.title}</Link>
                    </div>
                }
            </li>
          ))}
      </ul>
      </nav>
    );
};

export default SidebarMenu;