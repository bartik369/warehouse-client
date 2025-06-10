import React from "react";
import { BsArrowsMove } from "react-icons/bs";
import { LiaCitySolid } from "react-icons/lia";
import { AiOutlineUnlock } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { TbArrowsMove } from "react-icons/tb";
import { FiUserPlus, FiUserMinus } from "react-icons/fi";
import { LuUsers, LuHandshake, LuWarehouse } from "react-icons/lu";
import { MdOutlineLibraryAddCheck, MdSupportAgent  } from "react-icons/md";
import { IoCalendarNumberOutline, IoStatsChartOutline } from "react-icons/io5";
import { TbFileDescription, TbBrandComedyCentral, TbLocationPlus, 
TbDeviceDesktopPlus } from "react-icons/tb";
import { TbSettings } from "react-icons/tb";
import { MdOutlineLockReset } from "react-icons/md";
import { TbUserCircle } from "react-icons/tb";
import { MdOutlineAdminPanelSettings } from "react-icons/md";


const  DeviceHistory = React.lazy(() => import('../../components/pages/device/DeviceHistory'));
const  Another = React.lazy(() => import('../../components/pages/device/Another'));

export const headerMenuData = [
    {id: 1, title: 'Ссылка 1', path: '#'},
    {id: 2, title: 'Ссылка 2', path: '#'},
    {id: 3, title: 'Ссылка 3', path: '#'},
    {id: 4, title: 'Ссылка 4', path: '#'},
];
export const profileMenuData = [
    {id: 1, title: 'Админ-панель', path: '/admin/add-device', icon: MdOutlineAdminPanelSettings},
    {id: 2, title: 'Профиль', path: '#', icon: TbUserCircle},
    {id: 3, title: 'Сброс пароля', path: '#', icon: MdOutlineLockReset},
    {id: 4, title: 'Настройки', path: '#', icon: TbSettings},
];
export const sidebarMenuData = [
      { id: 1,  title: 'Локации', path: '', icon: LuWarehouse, subMenu: [
      { id: 1, title: 'Московский офис', path: 'msk'},
      { id: 2, title: 'Екатеринбург', path: 'ekb'},    ]
},
    {id: 2, title: 'Сообщения', path: '/messages', icon: BiMessageSquareDetail},
    {id: 3, title: 'Пользователи', path: '/admin/users', icon: LuUsers},
    {id: 4, title: 'Подрядчики', path: '/contractors', icon: LuHandshake},
    {id: 5, title: 'Календарь', path: '/calendar', icon: IoCalendarNumberOutline},
    {id: 6, title: 'Статистика', path: '/statistic', icon: IoStatsChartOutline},
    {id: 7, title: 'База знаний', path: '/library', icon: MdOutlineLibraryAddCheck},
];
export const deviceActionsMenu = [
    {id: 1, title: 'Выдать', icon: FiUserPlus},
    {id: 2, title: 'Принять', icon: FiUserMinus},
    {id: 3, title: 'Переместить', icon: BsArrowsMove},
    {id: 4, title: 'Информация', icon: TbFileDescription},
]

export const deviceTabsMenu = [
    {id: 1, label: 'История', component: DeviceHistory },
    {id: 2, label: 'Другое', component: Another },
]
export const adminMenu = [
    {id: 1, title: 'Пользователи', path: '#', icon: FiUserPlus, subMenu: [
      {id: 1, title: 'Добавить', path: '/admin/add-user'},
      {id: 2, title: 'Редактировать', path: '/admin/users'},
    ]},
    {id: 2, title: 'Склады', path: '/admin/add-warehouse', icon: TbLocationPlus},
    {id: 3, title: 'Устройства', path: '#', icon: TbDeviceDesktopPlus, subMenu: [
        {id: 1, title: 'Добавить', path: '/admin/add-device'},
        {id: 2, title: 'Редактировать', path: '/admin/edit-device'},
        {id: 3, title: 'Модели', path: '/admin/add-model'},
        {id: 4, title: 'Типы', path: '/admin/add-type'},
      ]},
    {id: 4, title: 'Города', path: '/admin/add-location', icon: LiaCitySolid},
    {id: 5, title: 'Отделы', path: '/admin/add-department', icon: TbArrowsMove},
    {id: 6, title: 'Подрядчики', path: '/admin/add-contractor', icon: MdSupportAgent},
    {id: 7, title: 'Доступ', path: '#', icon: AiOutlineUnlock, subMenu: [
        { id: 1, title: 'Новая роль', path: '/admin/add-role'},
        { id: 2, title: 'Новые права', path: '/admin/add-permission'},
        { id: 3, title: 'Права ролей', path: '/admin/add-permission_role'},
        { id: 4, title: 'Роли пользователей', path: '/admin/grant-access'},
    ]},
    {id: 8, title: 'Производители', path: '/admin/add-manufacturer', icon: TbBrandComedyCentral},
]

  
