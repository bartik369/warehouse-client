import { DeviceTypes } from './../../types/devices';

export const manufacturers = [
    {id: 1, name: 'Apple', value: ''},
    {id: 2, name: 'DELL', value: ''},
    {id: 3, name: 'Check Point', value: ''},
    {id: 4, name: 'Cisco', value: ''},
    {id: 5, name: 'HP', value: ''},
    {id: 6, name: 'Kyocera', value: ''},
    {id: 7, name: 'Lenovo', value: ''},
    {id: 8, name: 'Nokia', value: ''},
    {id: 9, name: 'Philips', value: ''},
    {id: 10, name: 'Sony', value: ''},
]

export const manufacturersLabel = 'Производитель';
export const deviceTypeLabel = 'Тип устройства';
export const selectFromList = 'Выбрать из списка';
export const deviceWeight = 'Вес устройства (кг)';
export const kg = '(кг)';


export const deviceType = [
  {id: 1, name: 'Аксессуар', value:'accessory'},
  {id: 2, name: 'Аудио-устройство', value:'audio'},
  {id: 3, name: 'Видео-устройство', value:'video'},
  {id: 4, name: 'Монитор', value:'monitor'},
  {id: 5, name: 'Мобильный телефон', value:'mobile'},
  {id: 6, name: 'Ноутбук', value:'laptop'},
  {id: 7, name: 'Принтер', value:'printer'},
  {id: 8, name: 'Расходный материал', value:'consumable'},
  {id: 9, name: 'Сетевое оборудование', value:'network'},
  {id: 10, name: 'Стационарный телефон', value:'phone'},
  {id: 11, name: 'Стационарный компьютер', value:'desktop'},
  {id: 12, name: 'Телевизор', value:'tv'},
]
export const locations = [
  {id: 1, name: 'Московский офис 4эт', value:'msk_4floor'},
  {id: 2, name: 'Московский офис 1эт', value:'msk_1floor'},
  {id: 3, name: 'Офис Санкт-Петербург', value:'spb'},
]


export const deviceTypes:DeviceTypes = {
  laptop: {
    label: "Ноутбук",
    uniqueFields: [
      { name: "screenSize", label: "Размер экрана", type: "number", step: 0.1 },
      { name: "memorySize", label: "Оперативная память", type: "number", step: 1 },
    ],
  },
  monitor: {
    label: "Монитор",
    uniqueFields: [
      { name: "screenSize", label: "Размер экрана", type: "number", step: 0.1},
    ],
  },
  desktop: {
    label: "Стационарный компьютер",
    uniqueFields: [
      { name: "cpuCores", label: "Кол-во ядер процессора", type: "number", step: 1},
    ],
  },
  tv: {
    label: "Телевизор",
    uniqueFields: [
      { name: "screenSize", label: "Размер экрана", type: "number", step: 0.1 },
    ],
  },
  mobile: {
    label: "Мобильный телефон",
    uniqueFields: [
        { name: "screenSize", label: "Размер экрана", type: "number", step: 0.1 },
        { name: "memorySize", label: "Оперативная память", type: "number", step: 2 },
    ],
  },
};
