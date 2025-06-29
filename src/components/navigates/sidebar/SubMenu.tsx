import { Submenu } from '@/types/navigation';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './SidebarMenu.module.scss';

interface SubMenuProps {
    item: {
      subMenu: Submenu[]
    };
    open: boolean;
    title: string;
}

const SubMenu = ({ item, open, title }:SubMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLink = (e: React.MouseEvent<HTMLLIElement>, item: Submenu) => {
    e.preventDefault()
    navigate(`/devices/locations/${item.path}`)
  }

   return (
     <div className={styles.wrapper}>
       <div className={styles.subTitle}>
        {!open && title}
       </div>
       <ul className={styles.submenu}>
         {item.subMenu.map((subItem: Submenu) => (
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