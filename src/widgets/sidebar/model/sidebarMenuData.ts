import { AiOutlineLaptop } from 'react-icons/ai';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { IoCalendarNumberOutline, IoStatsChartOutline } from 'react-icons/io5';
import { LuArrowDownToLine, LuArrowUpFromLine, LuHandshake, LuUsers } from 'react-icons/lu';
import { MdOutlineInventory, MdOutlineLibraryAddCheck } from 'react-icons/md';

export const sidebarMenuData = [
  {
    id: 1,
    title: 'Список устройств',
    path: 'devices/locations/msk',
    icon: AiOutlineLaptop,
  },
  { id: 2, title: 'Список выдач', path: '/issues', icon: LuArrowUpFromLine },
  { id: 3, title: 'Список возвратов', path: '/returns', icon: LuArrowDownToLine },
  { id: 4, title: 'Инвентаризации', path: '/inventory/inventory-create', icon: MdOutlineInventory },
  { id: 5, title: 'Подрядчики', path: '/contractors', icon: LuHandshake },
  { id: 6, title: 'Календарь', path: '/calendar', icon: IoCalendarNumberOutline },
  { id: 7, title: 'Статистика', path: '/statistics', icon: IoStatsChartOutline },
  { id: 8, title: 'Сообщения', path: '/messages', icon: BiMessageSquareDetail },
  { id: 9, title: 'Пользователи', path: '/admin/users', icon: LuUsers },
  { id: 10, title: 'База знаний', path: '/knowledge', icon: MdOutlineLibraryAddCheck },
];
