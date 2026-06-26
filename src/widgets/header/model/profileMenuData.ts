import { MdOutlineAdminPanelSettings, MdOutlineLockReset } from 'react-icons/md';
import { TbSettings, TbUserCircle } from 'react-icons/tb';

export const profileMenuData = [
  { id: 1, title: 'Админ-панель', path: '/admin/add-device', icon: MdOutlineAdminPanelSettings },
  { id: 2, title: 'Профиль', path: '#', icon: TbUserCircle },
  { id: 3, title: 'Сброс пароля', path: '#', icon: MdOutlineLockReset },
  { id: 4, title: 'Настройки', path: '#', icon: TbSettings },
];
