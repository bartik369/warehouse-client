import { IoMdArrowUp } from 'react-icons/io';

export const config = {
  ISSUE: {
    label: 'Выдача',
    icon: IoMdArrowUp,
    style: 'issue',
  },
  RETURN: {
    label: 'Возврат',
    icon: IoMdArrowUp,
    style: 'return',
  },
  TRANSFER: {
    label: 'Перемещение',
    icon: IoMdArrowUp,
    style: 'transfer',
  },
} as const;
