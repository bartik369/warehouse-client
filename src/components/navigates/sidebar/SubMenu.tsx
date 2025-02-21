import {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {ISubmenu } from '../../../types/navigation';
import styles from './SidebarMenu.module.scss';

interface ISubMenuProps {
    item: {
      subMenu: ISubmenu[]
    };
    open: boolean;
    title: string;
}

const SubMenu:FC<ISubMenuProps> = ({item, open, title}) => {
   return (
     <div className={styles.wrapper}>
       <div className={styles['sub-title']}>
        {!open && title}
       </div>
       <ul className={styles.submenu}>
         {item.subMenu.map((subItem: ISubmenu) => (
           <li key={subItem.id}>
            <NavLink 
              className={({isActive}) => `${isActive && styles.active}`} 
              to={`/devices/locations/${subItem.path}`}>
              {subItem.title}
             </NavLink>
           </li>
         ))}
       </ul>
     </div>
   );
};

export default SubMenu;