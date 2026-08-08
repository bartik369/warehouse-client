import { ReactNode } from 'react';

import { InputProps } from 'antd';

import { User } from '@/entities/user/model/types';

export interface UserAutocompleteOption {
  value: string;
  label: ReactNode;
  user: User;
}

export type UserAutocompleteOptions = UserAutocompleteOption[];

export type AutocompleteFieldProps = Omit<InputProps, 'placeholder'> & {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onClear?: () => void;
  onOptionSelect?: (value: string, option: UserAutocompleteOption) => void;
  options?: UserAutocompleteOptions;
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
