import { MdOutlineAdminPanelSettings, MdOutlineLockReset } from 'react-icons/md';
import { TbSettings, TbUserCircle } from 'react-icons/tb';

export const profileMenuData = [
  { id: 2, title: 'Профиль', subtitle: 'Личные данные', path: '#', icon: TbUserCircle },
  {
    id: 3,
    title: 'Сброс пароля',
    subtitle: 'Безопасность аккаунта',
    path: '#',
    icon: MdOutlineLockReset,
  },
];
export const systemMenuData = [
  {
    id: 1,
    title: 'Админ-панель',
    subtitle: 'Пользователи, устройства, типы и др.',
    path: '/admin/add-device',
    icon: MdOutlineAdminPanelSettings,
  },
  {
    id: 4,
    title: 'Настройки',
    subtitle: 'Общие параметры и конфигурация',
    path: '#',
    icon: TbSettings,
  },
];
