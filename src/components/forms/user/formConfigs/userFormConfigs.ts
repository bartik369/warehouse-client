import { FieldUserFormConfig } from "../../../../types/content";
import { LABELS } from "../../../../utils/constants/ui/labels";

export const createFormFields: FieldUserFormConfig[] = [
  { type: 'input', name: 'firstNameRu', label: LABELS.firstNameRu },
  { type: 'input', name: 'lastNameRu', label: LABELS.lastNameRu },
  { type: 'input', name: 'firstNameEn',  label: LABELS.firstNameEn },
  { type: 'input', name: 'lastNameEn', label: LABELS.lastNameEn },
  { type: 'input', name: 'userName', label: LABELS.userLogin },
  { type: 'input', name: 'email',  label: LABELS.email },
  { type: 'input', name: 'workId', label: LABELS.workID },
  {
    type: 'select',
    name: 'department',
    label: LABELS.department,
    itemsKey: 'departments',
  },
  {
    type: 'select',
    name: 'location',
    label: LABELS.location,
    itemsKey: 'locations',
  },
];