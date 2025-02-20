import { DeviceTypes } from './../../types/devices';

export const manufacturersLabel = 'Производитель';
export const modelLabel = 'Модель';
export const nameLabel = 'Название';
export const screenSizeLabel = 'Диагональ';
export const memorySizeLabel = 'Память';
export const isFunctionalLabel = 'Исправность';
export const isAssignedLabel = 'Доступность';
export const warehouseLabel = 'Склад';
export const slugLabel = 'Slug';
export const deviceName = 'Название';
export const serialNumber = 'Серийный номер';
export const inventoryNumber = 'Инвентарный номер';
export const location = 'Локация';
export const description = 'Описание';
export const modelCode = 'Код модели';
export const deviceTypeLabel = 'Тип устройства';
export const selectFromList = 'Выбрать из списка';
export const noExistSelect = 'Нет доступных опций';
export const deviceWeight = 'Вес устройства(кг)';
export const kg = '(кг)';
export const move = "Переместить";
export const accept = "Принять";
export const deviceInfo = "Информация";


export const deviceTypes:DeviceTypes = {
  laptop: {
    label: "Ноутбук",
    uniqueFields: [
      { name: "screenSize", label: "Размер экрана(дюйм)", type: "number", step: 0.1 },
      { name: "memorySize", label: "Оперативная память(гб)", type: "number", step: 2 },
    ],
  },
  monitor: {
    label: "Монитор",
    uniqueFields: [
      { name: "screenSize", label: "Размер экрана(дюйм)", type: "number", step: 0.1},
    ],
  },
  desktop: {
    label: "Стационарный компьютер",
    uniqueFields: [
      { name: "memorySize", label: "Оперативная память(гб)", type: "number", step: 2 },
    ],
  },
  tv: {
    label: "Телевизор",
    uniqueFields: [
      { name: "screenSize", label: "Размер экрана(дюйм)", type: "number", step: 0.1 },
    ],
  },
  mobile_phone: {
    label: "Мобильный телефон",
    uniqueFields: [
        { name: "screenSize", label: "Размер экрана(дюйм)", type: "number", step: 0.1 },
        { name: "memorySize", label: "Оперативная память(гб)", type: "number", step: 2 },
        
    ],
  },
};

export const extraOptions = [
  {id: 1, name: 'inventoryNumber', label: 'Инвентарный номер' },
  {id: 2, name: 'serialNumber', label: 'Серийный номер' },
]


