import { ReactNode } from 'react';

import { IconType } from 'react-icons';
import { CiCircleCheck } from 'react-icons/ci';
import { CiTimer } from 'react-icons/ci';
import { IoTimeOutline } from 'react-icons/io5';
import { LuClock4 } from 'react-icons/lu';

import { Status } from '@/shared/ui/custom-tag/types';

import { IssueProcessStatus, IssueProcessStatusConfig, ItemType } from './types';

export const BASE_STEPS: ItemType[] = [
  {
    title: 'Выбор склада',
    content: 'Выберите склад с которого хотите выдать оборудование',
  },
  {
    title: 'Выбор пользователя',
    content: 'Выберите пользователя, которому выдаете оборудование',
  },
  {
    title: 'Выбор устройств',
    content: 'Выберите устройста, которые выдаете пользователю',
  },
  {
    title: 'Подпись документа',
    content: 'Подпись актва выдачи оборудования обеими сторонами',
  },
  {
    title: 'Отправка на почту',
    content: 'Отправка акта выдачи оборудования на почту пользователя',
  },
];

export const ASSIGNED_USER_DEVICES = 'Текущие устройства пользователя';

export const ISSUE_PROCESS_STATUS_CONFIG: Record<IssueProcessStatus, IssueProcessStatusConfig> = {
  [IssueProcessStatus.Draft]: {
    title: 'В процессе',
    variant: 'processing',
    icon: LuClock4,
    iconSize: 14,
  },
  [IssueProcessStatus.Completed]: {
    title: 'Завершено',
    variant: 'success',
    icon: CiCircleCheck,
    iconSize: 14,
  },
};
