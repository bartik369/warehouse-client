import { ReactNode } from 'react';

import { SelectProps } from 'antd';

export type SelectFieldProps = Omit<SelectProps, 'placeholder'> & {
  label: string;
  error?: string;
};
