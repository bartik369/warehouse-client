import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

export const SECTION_TITLES = {
  actIssueTitle: 'Акт приема-передачи',
  financialOptions: 'Финансовая часть',
  warrantyOptions: 'Опции гарантии',
  addManufacturer: 'Добавление производителя',
  addModel: 'Добавление модели',
  addType: 'Добавление типа',
  technicalOptions: 'Характеристики',
  addUser: 'Добавить пользователя',
  addWarehouse: 'Добавить склад',
  addLocation: 'Добавить город',
  addContractor: 'Добавить подрядчика',
  addDepartment: 'Добавить отдел',
  addPermission: 'Добавить разрешение',
  addRole: 'Добавить роль',
  addRolePermission: 'Назначить разрешение роли',
  grantAccess: 'Предоставление роли',
  userListRoles: 'Список ролей пользователя',
  editDevice: 'Редактирование устройства',
  download: 'Скачать',
  section: 'Раздел',
};

export const BASE_STEPS: ItemType[] = [
  { title: 'Выбор склада' },
  { title: 'Выбор пользователя' },
  { title: 'Выбор устройств' },
  { title: 'Подпись документа' },
  { title: 'Отправка на почту' },
];
