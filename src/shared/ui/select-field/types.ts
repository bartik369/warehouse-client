import { SelectProps } from 'antd';

export type SelectFieldProps = Omit<SelectProps, 'placeholder'> & {
  label: string;
  error?: string;
};
