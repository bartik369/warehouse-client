import {FC} from 'react';
import { Link } from 'react-router-dom';
import {ISubmenu } from '../../../types/navigation';
import style from './SidebarMenu.module.scss';

interface ISubMenuProps {
    item: {
      subMenu: ISubmenu[]
    };
    open: boolean;
    title: string;
}

const SubMenu:FC<ISubMenuProps> = ({item, open, title}) => {
   return (
     <div className={style.wrapper}>
       <div className={style['sub-title']}>
        {!open && title}
       </div>
       <ul className={style.submenu}>
         {item.subMenu.map((subItem: ISubmenu) => (
           <li key={subItem.id}>
             <Link to={`/devices/locations/${subItem.path}`}>
               {subItem.title}
             </Link>
           </li>
         ))}
       </ul>
     </div>
   );
};

export default SubMenu;