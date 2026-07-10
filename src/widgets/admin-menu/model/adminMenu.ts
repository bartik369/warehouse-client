import { AiOutlineUnlock } from 'react-icons/ai';
import { FiUserPlus } from 'react-icons/fi';
import { LiaCitySolid } from 'react-icons/lia';
import { MdSupportAgent } from 'react-icons/md';
import {
  TbArrowsMove,
  TbBrandComedyCentral,
  TbDeviceDesktopPlus,
  TbLocationPlus,
} from 'react-icons/tb';

export const adminMenu = [
  {
    id: 1,
    title: 'Пользователи',
    path: '#',
    icon: FiUserPlus,
    subMenu: [
      { id: 1, title: 'Добавить', path: '/admin/add-user' },
      { id: 2, title: 'Редактировать', path: '/admin/users' },
    ],
  },
  { id: 2, title: 'Склады', path: '/admin/warehouses', icon: TbLocationPlus },
  {
    id: 3,
    title: 'Устройства',
    path: '#',
    icon: TbDeviceDesktopPlus,
    subMenu: [
      { id: 1, title: 'Добавить', path: '/admin/add-device' },
      { id: 2, title: 'Редактировать', path: '/admin/edit-device' },
      { id: 3, title: 'Модели', path: '/admin/add-model' },
      { id: 4, title: 'Типы', path: '/admin/add-type' },
    ],
  },
  { id: 4, title: 'Города', path: '/admin/add-location', icon: LiaCitySolid },
  { id: 5, title: 'Отделы', path: '/admin/add-department', icon: TbArrowsMove },
  { id: 6, title: 'Подрядчики', path: '/admin/add-contractor', icon: MdSupportAgent },
  {
    id: 7,
    title: 'Доступ',
    path: '#',
    icon: AiOutlineUnlock,
    subMenu: [
      { id: 1, title: 'Новая роль', path: '/admin/add-role' },
      { id: 2, title: 'Новые права', path: '/admin/add-permission' },
      { id: 3, title: 'Права ролей', path: '/admin/add-permission_role' },
      { id: 4, title: 'Роли пользователей', path: '/admin/grant-access' },
    ],
  },
  { id: 8, title: 'Производители', path: '/admin/manufacturers', icon: TbBrandComedyCentral },
];
