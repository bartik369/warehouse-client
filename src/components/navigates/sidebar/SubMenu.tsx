import {FC} from 'react';
import { Link } from 'react-router-dom';
import style from './SidebarMenu.module.scss';

interface ISubMenuProps {
    item: any;
    open: boolean;
}

const SubMenu:FC<ISubMenuProps> = ({item, open}) => {
   return (
     <div className={style.wrapper}>
       <div className={style['sub-title']}>
        {!open && item.title}
       </div>
       <ul className={style.submenu}>
         {item.subMenu.map((subitem: any, subindex: any) => (
           <li key={subindex}>
             <Link to={subitem}>
               {subitem.title}
             </Link>
           </li>
         ))}
       </ul>
     </div>
   );
};

export default SubMenu;