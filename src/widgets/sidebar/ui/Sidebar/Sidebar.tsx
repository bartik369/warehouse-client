import Logo from '../Logo/Logo';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import style from './Sidebar.module.scss';

interface SidebarProps {
  open: boolean;
}

const Sidebar = ({ open }: SidebarProps) => {
  return (
    <div className={open ? style.active : style.notactive}>
      <Logo open={open} />
      <SidebarMenu open={open} />
    </div>
  );
};

export default Sidebar;
