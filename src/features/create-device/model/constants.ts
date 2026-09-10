export const DEVICE_FORM_INFO = {
  image: {
    title: 'Изображение устройства',
    description:
      'После выбора типа, производителя и модели изображение подгрузится автоматически. Если изображение не найдено, будет показана стандартная иконка.',
  },

  inventoryNumber: {
    title: 'Подсказка',
    description:
      'Проверьте правильность заполнения инвентарного номера. Он должен быть уникальным в системе. Если в списке нет необходмой модели, производителя и тд, то необходимо добавить в соотвествующем разделе.',
  },
};

export const CREATE_DEVICE_DESCRIPTION = 'Заполните информацию об устройстве.';

export const DEVICE_TYPE_FIELDS = {
  laptop: {
    screenSize: true,
    memorySize: true,
  },
  desktop: {
    screenSize: false,
    memorySize: true,
  },
  monitor: {
    screenSize: true,
    memorySize: false,
  },
  tv: {
    screenSize: true,
    memorySize: false,
  },
  mobile_phone: {
    screenSize: true,
    memorySize: true,
  },
} as const;

export const NOTIFICATIONS = {
  added: 'Устройство добавлено',
  updated: 'Устройство обновлено',
};
