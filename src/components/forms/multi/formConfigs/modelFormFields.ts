import { FieldMultiformConfig } from '../../../../types/content';
import { LABELS } from '../../../../utils/constants/ui/labels';
import { PLACEHOLDER_LABELS } from '../../../../utils/constants/ui/placeholders';

export const modelFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: LABELS.name, placeholder: '' },
  { type: 'input', name: 'slug', label: LABELS.slug, placeholder: '' },
  {
    type: 'select',
    name: 'manufacturer',
    label: LABELS.manufacturer,
    placeholder: '',
    itemsKey: 'manufacturers',
  },
  {
    type: 'select',
    name: 'type',
    label: LABELS.deviceType,
    placeholder: '',
    itemsKey: 'types',
  },
];

export const typeFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: LABELS.name, placeholder: '' },
  { type: 'input', name: 'slug', label: LABELS.slug, placeholder: '' },
];

export const manufacturerFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: LABELS.name, placeholder: '' },
  { type: 'input', name: 'slug', label: LABELS.slug, placeholder: '' },
  {
    type: 'textarea',
    name: 'comment',
    label: LABELS.description,
    placeholder: '',
  },
];
export const locationFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: LABELS.name, placeholder: '' },
  { type: 'input', name: 'slug', label: LABELS.slug, placeholder: '' },
  {
    type: 'textarea',
    name: 'comment',
    label: LABELS.description,
    placeholder: '',
  },
];
export const departmentFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: LABELS.name, placeholder: '' },
  { type: 'input', name: 'slug', label: LABELS.slug, placeholder: '' },
  {
    type: 'textarea',
    name: 'comment',
    label: LABELS.description,
    placeholder: '',
  },
];
export const warehouseFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: LABELS.name, placeholder: '' },
  { type: 'input', name: 'slug', label: LABELS.slug, placeholder: '' },
  {
    type: 'select',
    name: 'locationName',
    label: LABELS.location,
    placeholder: '',
    itemsKey: 'cities',
  },
  {
    type: 'textarea',
    name: 'comment',
    label: LABELS.description,
    placeholder: '',
  },
];
export const contractorFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: LABELS.name, placeholder: '' },
  { type: 'input', name: 'slug', label: LABELS.slug, placeholder: '' },
  {
    type: 'tel',
    name: 'phoneNumber',
    label: LABELS.phoneNumber,
    placeholder: PLACEHOLDER_LABELS.phoneMask,
  },
  {
    type: 'textarea',
    name: 'address',
    label: LABELS.address,
    placeholder: '',
  },
];
export const roleFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: LABELS.name, placeholder: '' },
  {
    type: 'textarea',
    name: 'comment',
    label: LABELS.description,
    placeholder: '',
  },
];

export const permissionFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: LABELS.name, placeholder: '' },
  {
    type: 'textarea',
    name: 'comment',
    label: LABELS.description,
    placeholder: '',
  },
];
export const provideRolesFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: LABELS.name, placeholder: '' },
  {
    type: 'select',
    name: 'type',
    label: 'Role provide',
    placeholder: '',
    itemsKey: 'roles',
  },
];
