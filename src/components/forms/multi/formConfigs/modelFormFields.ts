import { FieldMultiformConfig } from '../../../../types/content';
import {
  addressLabel,
  description,
  locationLabel,
  name,
  phoneMaskPlaceholder,
  slug,
} from '../../../../utils/constants/constants';
import {
  deviceTypeLabel,
  manufacturersLabel,
  phoneNumberLabel,
} from '../../../../utils/constants/device';

export const modelFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: name, placeholder: '' },
  { type: 'input', name: 'slug', label: slug, placeholder: '' },
  {
    type: 'select',
    name: 'manufacturer',
    label: manufacturersLabel,
    placeholder: '',
    itemsKey: 'manufacturers',
  },
  {
    type: 'select',
    name: 'type',
    label: deviceTypeLabel,
    placeholder: '',
    itemsKey: 'types',
  },
];

export const typeFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: name, placeholder: '' },
  { type: 'input', name: 'slug', label: slug, placeholder: '' },
];

export const manufacturerFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: name, placeholder: '' },
  { type: 'input', name: 'slug', label: slug, placeholder: '' },
  {
    type: 'textarea',
    name: 'comment',
    label: description,
    placeholder: '',
  },
];
export const locationFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: name, placeholder: '' },
  { type: 'input', name: 'slug', label: slug, placeholder: '' },
  {
    type: 'textarea',
    name: 'comment',
    label: description,
    placeholder: '',
  },
];
export const departmentFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: name, placeholder: '' },
  { type: 'input', name: 'slug', label: slug, placeholder: '' },
  {
    type: 'textarea',
    name: 'comment',
    label: description,
    placeholder: '',
  },
];
export const warehouseFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: name, placeholder: '' },
  { type: 'input', name: 'slug', label: slug, placeholder: '' },
  {
    type: 'select',
    name: 'locationName',
    label: locationLabel,
    placeholder: '',
    itemsKey: 'cities',
  },
  {
    type: 'textarea',
    name: 'comment',
    label: description,
    placeholder: '',
  },
];
export const contractorFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: name, placeholder: '' },
  { type: 'input', name: 'slug', label: slug, placeholder: '' },
  {
    type: 'tel',
    name: 'phoneNumber',
    label: phoneNumberLabel,
    placeholder: phoneMaskPlaceholder,
  },
  {
    type: 'textarea',
    name: 'address',
    label: addressLabel,
    placeholder: '',
  },
];
export const roleFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: name, placeholder: '' },
  {
    type: 'textarea',
    name: 'comment',
    label: description,
    placeholder: '',
  },
];

export const permissionFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: name, placeholder: '' },
  {
    type: 'textarea',
    name: 'comment',
    label: description,
    placeholder: '',
  },
];
export const provideRolesFormFields: FieldMultiformConfig[] = [
  { type: 'input', name: 'name', label: name, placeholder: '' },
  {
    type: 'select',
    name: 'type',
    label: 'Role provide',
    placeholder: '',
    itemsKey: 'roles',
  },
];
