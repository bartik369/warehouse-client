import type { TextAreaProps } from 'antd/es/input/TextArea';

export type TextareaFieldProps = Omit<TextAreaProps, 'placeholder'> & {
  label: string;
  error?: string;
};
