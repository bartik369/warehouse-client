import React from 'react';

import { AiOutlineUnlock } from 'react-icons/ai';
import { BsArrowsMove } from 'react-icons/bs';
import { FiUserMinus, FiUserPlus } from 'react-icons/fi';
import { LiaCitySolid } from 'react-icons/lia';
import { MdSupportAgent } from 'react-icons/md';
import { TbArrowsMove } from 'react-icons/tb';
import {
  TbBrandComedyCentral,
  TbDeviceDesktopPlus,
  TbFileDescription,
  TbLocationPlus,
} from 'react-icons/tb';

import ekb from '@/assets/elements/ekb.png';
import msk from '@/assets/elements/msk.png';
import { DeviceLabel } from '@/types/devices';

const DeviceHistory = React.lazy(() => import('@/components/pages/device/DeviceHistory'));
const Another = React.lazy(() => import('@/components/pages/device/Another'));

export const headerMenuData = [
  { id: 1, title: 'Ссылка 1', path: '#' },
  { id: 2, title: 'Ссылка 2', path: '#' },
  { id: 3, title: 'Ссылка 3', path: '#' },
  { id: 4, title: 'Ссылка 4', path: '#' },
];

export const deviceActionsMenu = [
  { id: 1, title: 'Выдать', icon: FiUserPlus },
  { id: 2, title: 'Принять', icon: FiUserMinus },
  { id: 3, title: 'Переместить', icon: BsArrowsMove },
  { id: 4, title: 'Информация', icon: TbFileDescription },
];

export const deviceTabsMenu = [
  { id: 1, label: 'История', component: DeviceHistory },
  { id: 2, label: 'Другое', component: Another },
];
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
  { id: 2, title: 'Склады', path: '/admin/add-warehouse', icon: TbLocationPlus },
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
  { id: 8, title: 'Производители', path: '/admin/add-manufacturer', icon: TbBrandComedyCentral },
];

export const deviceIssueSteps = [
  { id: 'select_warehouse', label: 'Выбор склада' },
  { id: 'select_user', label: 'Выбор пользователя' },
  { id: 'select_devices', label: 'Список оборудования' },
  { id: 'sign_document', label: 'Подпись документа' },
  { id: 'send_document', label: 'Отправка документа' },
];

export const baseDeviceLabelConfig: DeviceLabel[] = [
  { key: 'name', label: 'Название' },
  { key: 'modelName', label: 'Модель' },
  { key: 'modelType', label: 'Тип' },
  { key: 'manufacturer', label: 'Производитель' },
  { key: 'inventoryNumber', label: 'Инвентарный номер' },
  { key: 'serialNumber', label: 'Серийный номер' },
];

export const locations = [
  {
    id: 1,
    label: 'Москва',
    image: msk,
    path: '/devices/locations/msk',
  },
  {
    id: 2,
    label: 'Екатеринбург',
    image: ekb,
    path: '/devices/locations/ekb',
  },
];
