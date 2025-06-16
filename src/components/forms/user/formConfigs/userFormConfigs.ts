import { FieldUserFormConfig } from "../../../../types/content";
import { labelFirstNameEn, labelFirstNameRu, labelLastNameEn, labelLastNameRu,
    labelUserLogin, labelEmail, labelUserId, labelDepartment, labelCity } from '../../../../utils/constants/user';

export const createFormFields: FieldUserFormConfig[] = [
  { type: 'input', name: 'firstNameRu', label: labelFirstNameRu },
  { type: 'input', name: 'lastNameRu', label: labelLastNameRu },
  { type: 'input', name: 'firstNameEn',  label: labelFirstNameEn },
  { type: 'input', name: 'lastNameEn', label: labelLastNameEn },
  { type: 'input', name: 'userName', label: labelUserLogin },
  { type: 'input', name: 'email',  label: labelEmail },
  { type: 'input', name: 'workId', label: labelUserId },
  {
    type: 'select',
    name: 'department',
    label: labelDepartment,
    itemsKey: 'departments',
  },
  {
    type: 'select',
    name: 'location',
    label: labelCity,
    itemsKey: 'locations',
  },
];