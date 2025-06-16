import Logo from '../logo/Logo';
import SidebarMenu from '../navigates/sidebar/SidebarMenu';
import style from './Sidebar.module.scss';

interface SidebarProps {
    open: boolean;
}

const Sidebar = ({ open }:SidebarProps) => {
    return (
        <div className={open ? style.active : style.notactive}>          
        <Logo open={open} />
        <SidebarMenu open={open}/>  
        </div>
    );
};

export default Sidebar;