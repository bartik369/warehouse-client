import { LuSettings } from 'react-icons/lu';
import { MdOutlineAdminPanelSettings, MdOutlineRemoveRedEye } from 'react-icons/md';

export const TITLES = {
  MANAGE_PERMISSIONS_ROLE: 'Управление доступом ролей',
  PERMISSIONS_ROLE_LIST: 'Список доступов ролей',
  PERMISSIONS_ROLE_ACTIONS: 'Редактирование разрешений роли',
  OTHERS_PERMISSIONS: 'Остальные разрешения:',
};
export const DESCRIPTION = 'Назначение доступов ролям пользователей';

export const NOTIFICATIONS = {
  created: 'Доступ роли добавлен',
  updated: 'Информация по доступ роли обновлена',
};

export const userRoleInfo = {
  manager: {
    title: 'Manager',
    icon: <MdOutlineAdminPanelSettings size={17} />,
  },
  operator: {
    title: 'Operator',
    icon: <LuSettings size={15} />,
  },
  viewer: {
    title: 'Viewer',
    icon: <MdOutlineRemoveRedEye size={15} />,
  },
};
