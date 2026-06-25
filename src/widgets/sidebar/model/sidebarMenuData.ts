import { BiMessageSquareDetail } from 'react-icons/bi';
import { IoCalendarNumberOutline, IoStatsChartOutline } from 'react-icons/io5';
import { LuHandshake, LuSquareChevronUp, LuUsers, LuWarehouse } from 'react-icons/lu';
import { MdOutlineInventory, MdOutlineLibraryAddCheck } from 'react-icons/md';

export const sidebarMenuData = [
  {
    id: 1,
    title: 'Локации',
    path: 'devices/locations',
    icon: LuWarehouse,
    subMenu: [
      { id: 1, title: 'Московский офис', path: 'msk' },
      { id: 2, title: 'Екатеринбург', path: 'ekb' },
    ],
  },
  { id: 2, title: 'Выдать', path: '/issue/create-issue', icon: LuSquareChevronUp },
  { id: 3, title: 'Сообщения', path: '/messages', icon: BiMessageSquareDetail },
  { id: 4, title: 'Пользователи', path: '/admin/users', icon: LuUsers },
  { id: 5, title: 'Инвентаризации', path: '/inventory/inventory-create', icon: MdOutlineInventory },
  { id: 6, title: 'Подрядчики', path: '/contractors', icon: LuHandshake },
  { id: 7, title: 'Календарь', path: '/calendar', icon: IoCalendarNumberOutline },
  { id: 8, title: 'Статистика', path: '/statistics', icon: IoStatsChartOutline },
  { id: 9, title: 'База знаний', path: '/knowledge', icon: MdOutlineLibraryAddCheck },
];
