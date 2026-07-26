import { ReactNode } from 'react';

import { AutoCompleteProps, InputProps } from 'antd';

import { User } from '@/entities/ user/model/types';

export interface UserAutocompleteOption {
  value: string;
  label: {
    props?: {
      user?: User;
    };
  };
}

export type AutocompleteFieldProps = Omit<InputProps, 'placeholder'> & {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onOptionSelect?: (value: string, option: UserAutocompleteOption) => void;
  options?: UserAutocompleteOption[];
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
