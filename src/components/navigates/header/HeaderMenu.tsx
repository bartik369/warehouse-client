import { DeviceInfo } from '../../../types/devices';
import { useDevice } from '../../../hooks/data/useDevice';
import styles from './HeaderMenu.module.scss';

interface IHeaderMenuProps {
  device: DeviceInfo;
}


const HeaderMenu = ({ device }:IHeaderMenuProps) => {
  const { filteredMenu, handleDeviceAction} = useDevice();
    return (
      <nav className={styles.menu}>
        <ul>
          {filteredMenu && filteredMenu.map((item) => (
              <li key={item.id} title={item.title}>
                <div className={styles.item} onClick={() => handleDeviceAction(item)}>
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