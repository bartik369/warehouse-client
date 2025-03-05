import { DeviceTypes, DevicePrices } from './../../types/devices';

export const selectDate = 'Укажите дату';
export const select = "Укажите";
export const manufacturersLabel = 'Производитель';
export const modelLabel = 'Модель';
export const nameLabel = 'Название';
export const screenSizeLabel = 'Диагональ';
export const memorySizeLabel = 'Память';
export const isFunctionalLabel = 'Исправность';
export const isAssignedLabel = 'Доступность';
export const warehouseLabel = 'Склад';
export const startWarrantyLabel = 'Начало гарантии';
export const endWarrantyLabel = 'Завершение гарантии';
export const phoneNumberLabel = 'Номер телефона';
export const contractorNameLabel = 'Имя подрядчика';
export const contractorAddressLabel = 'Адресс подрядчика';
export const warrantyNumber = 'Номер гарантии';
export const slugLabel = 'Slug';
export const deviceName = 'Название';
export const serialNumber = 'Серийный номер';
export const inventoryNumber = 'Инвентарный номер';
export const location = 'Локация';
export const description = 'Описание';
export const modelCode = 'Код модели';
export const contractor = "Подрядчик";
export const deviceTypeLabel = 'Тип устройства';
export const selectFromList = 'Выбрать из списка';
export const noExistSelect = 'Нет доступных опций';
export const deviceWeight = 'Вес устройства(кг)';
export const kg = '(кг)';
export const move = "Переместить";
export const accept = "Принять";
export const issue = 'Выдать';
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


export const devicePrices:DevicePrices = {
    uniqueFields: [
      { name: "price_with_vat", label: "Цена с НДС (руб)", type: "number", step: 1 },
      { name: "price_without_vat", label: "Цена без НДС (руб)", type: "number", step: 1 },
      { name: "residual_price", label: "Остаточная цена (руб)", type: "number", step: 1 },
    ],
};

export const extraOptions = [
  {id: 1, name: 'inventoryNumber', label: 'Инвентарный номер' },
  {id: 2, name: 'serialNumber', label: 'Серийный номер' },
]


