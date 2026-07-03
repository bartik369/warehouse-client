import React from 'react';

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

export const deviceTabsMenu = [
  { id: 1, label: 'История', component: DeviceHistory },
  { id: 2, label: 'Другое', component: Another },
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
