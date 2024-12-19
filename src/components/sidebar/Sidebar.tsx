import React, {FC, useState} from 'react';
import Logo from '../logo/Logo';
import BurgerBtn from '../ui/buttons/burger/BurgerBtn';
import SidebarMenu from '../navigates/sidebar/SidebarMenu';
import style from './Sidebar.module.scss';

interface ISidebarProps {
    open: boolean;
}

const Sidebar:FC<ISidebarProps> = ({open}) => {
    return (
        <div className={open ? style.active : style.notactive}>            <Logo />
            <SidebarMenu />  
        </div>
    );
};

export default Sidebar;