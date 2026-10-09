import { BiMessageSquareDetail } from 'react-icons/bi';
import { BsBoxes } from 'react-icons/bs';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { LuPackageMinus, LuPackagePlus } from 'react-icons/lu';
import { LuUsers } from 'react-icons/lu';
import { MdOutlineInventory, MdOutlineLibraryAddCheck } from 'react-icons/md';

export const sidebarMenuData = [
  {
    id: 1,
    title: 'Список устройств',
    path: 'devices/locations/msk',
    icon: BsBoxes,
  },
  { id: 2, title: 'Список выдач', path: '/issues', icon: LuPackageMinus },
  { id: 3, title: 'Список возвратов', path: '/returns', icon: LuPackagePlus },
  { id: 4, title: 'Инвентаризации', path: '/inventory', icon: MdOutlineInventory },
  { id: 6, title: 'Календарь', path: '/calendar', icon: IoCalendarNumberOutline },
  { id: 8, title: 'Сообщения', path: '/messages', icon: BiMessageSquareDetail },
  { id: 9, title: 'Пользователи', path: '/admin/users', icon: LuUsers },
  { id: 10, title: 'База знаний', path: '/knowledge', icon: MdOutlineLibraryAddCheck },
];
