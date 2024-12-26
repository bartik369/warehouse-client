import {FC} from 'react';
import { Link } from 'react-router-dom';
import { headerMenuData } from '../../../utils/data/menus';
import style from './HeaderMenu.module.scss';

const HeaderMenu:FC = () => {
    return (
      <nav className={style.menu}>
        <ul>
          {/* {headerMenuData &&
            headerMenuData.map((item, key) => (
              <li key={item.id}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))} */}
        </ul>
      </nav>
    );
};

export default HeaderMenu;