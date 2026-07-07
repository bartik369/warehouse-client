import { LABELS } from '@/utils/constants/ui/labels';

import { CreateUserFormValues } from './schema';
import { FormFieldConfig } from './types';

export const createUserFields: FormFieldConfig<CreateUserFormValues>[] = [
  {
    type: 'input',
    name: 'firstNameRu',
    label: LABELS.firstNameRu,
    col: {
      xs: 24,
      md: 12,
    },
  },
  {
    type: 'input',
    name: 'lastNameRu',
    label: LABELS.lastNameRu,
    col: {
      xs: 24,
      md: 12,
    },
  },
  {
    type: 'input',
    name: 'firstNameEn',
    label: LABELS.firstNameEn,
    col: {
      xs: 24,
      md: 12,
    },
  },
  {
    type: 'input',
    name: 'lastNameEn',
    label: LABELS.lastNameEn,
    col: {
      xs: 24,
      md: 12,
    },
  },
  {
    type: 'input',
    name: 'userName',
    label: LABELS.userLogin,
    col: {
      xs: 24,
      md: 12,
    },
  },
  {
    type: 'input',
    name: 'email',
    label: LABELS.email,
    col: {
      xs: 24,
      md: 12,
    },
  },
  {
    type: 'input',
    name: 'workId',
    label: LABELS.workID,
    col: {
      xs: 24,
      md: 12,
    },
  },
  {
    type: 'select',
    name: 'department',
    label: LABELS.department,
    itemsKey: 'departments',
    col: {
      xs: 24,
      md: 12,
    },
  },
  {
    type: 'select',
    name: 'location',
    label: LABELS.location,
    itemsKey: 'locations',
    col: {
      xs: 24,
      md: 12,
    },
  },
  {
    type: 'switch',
    name: 'isActive',
    label: LABELS.isActive,
    col: {
      xs: 24,
      md: 12,
    },
  },
];
