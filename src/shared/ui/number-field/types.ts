import { ReactNode } from 'react';

import { type InputNumberProps } from 'antd';

export type NumberFieldProps = Omit<InputNumberProps, 'placeholder'> & {
  label: string;
  error?: string;
  tooltip?: ReactNode;
};
