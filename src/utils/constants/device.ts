import { DeviceTypes } from './../../types/devices';

// export const manufacturers = [
//     {id: 1, name: 'Неизвестный', value: 'unknown'},
//     {id: 2, name: 'Apple', value: 'apple'},
//     {id: 3, name: 'DELL', value: 'dell'},
//     {id: 4, name: 'Check Point', value: 'check_point'},
//     {id: 5, name: 'Cisco', value: 'cisco'},
//     {id: 6, name: 'HP', value: 'hp'},
//     {id: 7, name: 'Kyocera', value: 'kyocera'},
//     {id: 8, name: 'Lenovo', value: 'lenovo'},
//     {id: 9, name: 'Nokia', value: 'nokia'},
//     {id: 10, name: 'Philips', value: 'philips'},
//     {id: 11, name: 'Sony', value: 'sony'},
// ]

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

// export const deviceType = [
//   {id: 1, name: 'Аксессуар', value:'accessory'},
//   {id: 2, name: 'Аудио-устройство', value:'audio'},
//   {id: 3, name: 'Видео-устройство', value:'video'},
//   {id: 4, name: 'Монитор', value:'monitor'},
//   {id: 5, name: 'Мобильный телефон', value:'mobile'},
//   {id: 6, name: 'Ноутбук', value:'laptop'},
//   {id: 7, name: 'Принтер', value:'printer'},
//   {id: 8, name: 'Расходный материал', value:'consumable'},
//   {id: 9, name: 'Сетевое оборудование', value:'network'},
//   {id: 10, name: 'Стационарный телефон', value:'phone'},
//   {id: 11, name: 'Стационарный компьютер', value:'desktop'},
//   {id: 12, name: 'Телевизор', value:'tv'},
// ]
// export const locations = [
//   {id: 1, name: 'Московский офис 4эт', value:'msk_4floor'},
//   {id: 2, name: 'Московский офис 1эт', value:'msk_1floor'},
//   {id: 3, name: 'Офис Санкт-Петербург', value:'spb'},
// ]
// export const serviceable = [
//   {id: 1, name: 'да', value: true},
//   {id: 2, name: 'нет', value: false},
// ]


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


