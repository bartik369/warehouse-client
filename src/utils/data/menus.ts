import React from "react";
import { LuUsers } from "react-icons/lu";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoCalendarNumberOutline, IoStatsChartOutline } from "react-icons/io5";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb"
import { BsArrowsMove } from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";
import { FiUserMinus } from "react-icons/fi";
import { LuHandshake } from "react-icons/lu";
import { LuWarehouse } from "react-icons/lu";
import { TbLocationPlus } from "react-icons/tb";
import { TbDeviceDesktopPlus } from "react-icons/tb";
import { LiaCitySolid } from "react-icons/lia";
import { AiOutlineUnlock } from "react-icons/ai";
import { TbBrandComedyCentral } from "react-icons/tb";




import { MdSupportAgent } from "react-icons/md";








const  DeviceHistory = React.lazy(() => import('../../components/pages/device/DeviceHistory'));
const  Another = React.lazy(() => import('../../components/pages/device/Another'));

export const headerMenuData = [
    {id: 1, title: 'Ссылка 1', path: '#'},
    {id: 2, title: 'Ссылка 2', path: '#'},
    {id: 3, title: 'Ссылка 3', path: '#'},
    {id: 4, title: 'Ссылка 4', path: '#'},
];
export const profileMenuData = [
    {id: 1, title: 'Админ-панель', path: '/admin/add-device'},
    {id: 2, title: 'Профиль', path: '#'},
    {id: 3, title: 'Сброс пароля', path: '#'},
    {id: 4, title: 'Настройки', path: '#'},
];
export const sidebarMenuData = [
      { id: 1,  title: 'Локации', path: '', icon: LuWarehouse, subMenu: [
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
    {id: 4, title: 'Информация', icon: TbFileDescription},
]

export const deviceTabsMenu = [
    {id: 1, label: 'История', component: DeviceHistory },
    {id: 2, label: 'Другое', component: Another },
]
export const adminMenu = [
    {id: 1, title: 'Добавить пользователя', path: '/admin/add-user', icon: FiUserPlus},
    {id: 2, title: 'Добавить склад', path: '', icon: TbLocationPlus},
    {id: 3, title: 'Добавить устройство', path: '/admin/add-device', icon: TbDeviceDesktopPlus},
    {id: 4, title: 'Добавить город', path: '', icon: LiaCitySolid},
    {id: 5, title: 'Добавить отдел', path: '', icon: BiMessageSquareDetail},
    {id: 6, title: 'Добавить подрядчика', path: '', icon: MdSupportAgent},
    {id: 7, title: 'Добавить роль', path: '', icon: AiOutlineUnlock},
    {id: 4, title: 'Добавить производителя', path: '', icon: TbBrandComedyCentral},
]

  
