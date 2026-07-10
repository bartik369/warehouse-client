import { ReactNode } from 'react';

import { type InputProps } from 'antd';

export type TextFieldProps = Omit<InputProps, 'placeholder'> & {
  label: string;
  error?: string;
  tooltip?: ReactNode;
};
