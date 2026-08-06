import { BsProjector } from 'react-icons/bs';
import { BsHddNetwork } from 'react-icons/bs';
import { BsPrinter } from 'react-icons/bs';
import { CiDesktopMouse2 } from 'react-icons/ci';
import { FiMonitor } from 'react-icons/fi';
import { GoArchive } from 'react-icons/go';
import { HiOutlineDeviceMobile } from 'react-icons/hi';
import { HiOutlineTv } from 'react-icons/hi2';
import { MdOutlinePhone } from 'react-icons/md';
import { PiLaptopDuotone } from 'react-icons/pi';
import { PiComputerTowerDuotone } from 'react-icons/pi';

export const DEVICE_NOT_FOUND = 'Устройства не найдены';
export const DEVICE_PLACEHOLDER = 'Введите серийный или инвентарный номер(пример - 700)';
export const SEARCH_PROCESS = 'Поиск устройств...';

export const DEVICE_TYPES = {
  accessory: {
    label: 'Accessory',
    icon: CiDesktopMouse2,
  },
  network: {
    label: 'Network',
    icon: BsHddNetwork,
  },
  monitor: {
    label: 'Monitor',
    icon: FiMonitor,
  },
  projector: {
    label: 'Projector',
    icon: BsProjector,
  },
  tv: {
    label: 'TV',
    icon: HiOutlineTv,
  },
  toner: {
    label: 'Toner',
    icon: GoArchive,
  },
  mobile_phone: {
    label: 'Mobile Phone',
    icon: HiOutlineDeviceMobile,
  },
  laptop: {
    label: 'Laptop',
    icon: PiLaptopDuotone,
  },
  desktop: {
    label: 'Desktop',
    icon: PiComputerTowerDuotone,
  },
  desktop_phone: {
    label: 'Desktop Phone',
    icon: MdOutlinePhone,
  },
  printer: {
    label: 'Printer',
    icon: BsPrinter,
  },
} as const;
