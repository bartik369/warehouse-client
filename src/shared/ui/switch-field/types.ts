export type SwitchFieldProps = {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  error?: string;
};
