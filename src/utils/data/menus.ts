import { LuUsers } from "react-icons/lu";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoStatsChartOutline } from "react-icons/io5";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { BsArrowsMove } from "react-icons/bs";

import { FiUserPlus } from "react-icons/fi";
import { FiUserMinus } from "react-icons/fi";
import { LuHandshake } from "react-icons/lu";
import { LuWarehouse } from "react-icons/lu";



export const headerMenuData = [
    {id: 1, title: 'Ссылка 1', path: '#'},
    {id: 2, title: 'Ссылка 2', path: '#'},
    {id: 3, title: 'Ссылка 3', path: '#'},
    {id: 4, title: 'Ссылка 4', path: '#'},
];
export const profileMenuData = [
    {id: 1, title: 'Админ-панель', path: '/admin'},
    {id: 2, title: 'Профиль', path: '#'},
    {id: 3, title: 'Сброс пароля', path: '#'},
    {id: 4, title: 'Настройки', path: '#'},
];
export const sidebarMenuData = [
      { id: 1,  title: 'Локации', path: '#', icon: LuWarehouse, subMenu: [
      { id: 1, title: 'Московский офис', path: 'msk'},
      { id: 2, title: 'Санкт-Петербург', path: 'spb'},
      { id: 3, title: 'Екатеринбург', path: 'ekb'},
    ]
},
    {id: 2, title: 'Сообщения', path: '/messages', icon: BiMessageSquareDetail},
    {id: 3, title: 'Пользователи', path: '/users', icon: LuUsers},
    {id: 4, title: 'Подрядчики', path: '/contractors', icon: LuHandshake},
    {id: 5, title: 'Календарь', path: '/calendar', icon: IoCalendarNumberOutline},
    {id: 6, title: 'Статистика', path: '/statistic', icon: IoStatsChartOutline},
    {id: 7, title: 'База знаний', path: '/library', icon: MdOutlineLibraryAddCheck},
];
export const deviceActionsMenu = [
    {id: 1, title: 'Выдать', icon: FiUserPlus},
    {id: 2, title: 'Принять', icon: FiUserMinus},
    {id: 3, title: 'Переместить', icon: BsArrowsMove},
]

  
