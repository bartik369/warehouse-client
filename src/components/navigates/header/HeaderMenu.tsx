import {FC} from 'react';
import { IDeviceInfo } from '../../../types/devices';
import { deviceActionsMenu } from '../../../utils/data/menus';
import styles from './HeaderMenu.module.scss';

interface IHeaderMenuProps {
  device: IDeviceInfo | null;
}

const HeaderMenu:FC<IHeaderMenuProps> = ({device}) => {
  const filteredMenu = deviceActionsMenu.filter((item) => {
    if (device?.isAssigned) {
      return item.title === 'Принять'
    } else {
      return item.title !== 'Принять'
    }
  })
    return (
      <nav className={styles.menu}>
        <ul>
          {filteredMenu &&
            filteredMenu.map((item) => (
              <li key={item.id} title={item.title}>
                <div className={styles.item}>
                  {item.icon && <item.icon className={styles.icon} />}
                  <span>{item.title}</span>
                </div>
              </li>
            ))}
        </ul>
      </nav>
    );
};

export default HeaderMenu;