import { ReactNode } from 'react';

import { InputProps } from 'antd';

import { Device } from '@/entities/device/model/types';

export interface DeviceAutocompleteOption {
  value: string;
  label: ReactNode;
  device: Device;
}

export type DeviceAutocompleteOptions = DeviceAutocompleteOption[];

export type AutocompleteFieldProps = Omit<
  InputProps,
  'placeholder' | 'value' | 'onChange' | 'onBlur'
> & {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onClear?: () => void;
  onOptionSelect?: (value: string, option: DeviceAutocompleteOption) => void;
  options?: DeviceAutocompleteOptions;
  onSearch?: (value: string) => void;
  loading?: boolean;
  searched?: boolean;
  label?: string;
  error?: string;
  className?: string;
  placeholder?: string;
  prefix?: ReactNode;
  disabled?: boolean;
};

type DeviceType =
  | 'accessory'
  | 'network'
  | 'monitor'
  | 'projector'
  | 'tv'
  | 'toner'
  | 'mobile_phone'
  | 'laptop'
  | 'desktop'
  | 'desktop_phone'
  | 'printer';
