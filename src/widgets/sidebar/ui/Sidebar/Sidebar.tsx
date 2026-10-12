import { Logo } from '../Logo/Logo';
import { SidebarMenu } from '../sidebar-menu/SidebarMenu';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  open: boolean;
}

export const Sidebar = ({ open }: SidebarProps) => {
  return (
    <div className={open ? styles.active : styles.notActive}>
      <Logo open={open} />
      <SidebarMenu open={open} />
    </div>
  );
};
