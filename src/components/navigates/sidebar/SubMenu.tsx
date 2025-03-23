import {FC} from 'react';
import { ISubmenu } from '../../../types/navigation';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './SidebarMenu.module.scss';

interface ISubMenuProps {
    item: {
      subMenu: ISubmenu[]
    };
    open: boolean;
    title: string;
}

const SubMenu:FC<ISubMenuProps> = ({item, open, title}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLink = (e: React.MouseEvent<HTMLLIElement>, item: ISubmenu) => {
    e.preventDefault()
    navigate(`/devices/locations/${item.path}`)
  }

   return (
     <div className={styles.wrapper}>
       <div className={styles["sub-title"]}>
        {!open && title}
       </div>
       <ul className={styles.submenu}>
         {item.subMenu.map((subItem: ISubmenu) => (
           <li key={subItem.id} className={location.pathname.includes(subItem.path)
            ? styles.active 
            : ""} 
            onClick={(e) => handleLink(e, subItem)}>
              {subItem.title}
           </li>
         ))}
       </ul>
     </div>
   );
};

export default SubMenu;