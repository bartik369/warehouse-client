import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';

import { SwitchField } from '../switch-field/SwitchField';
import { SwitchFieldProps } from '../switch-field/types';

type RhfSwitchFieldProps<T extends FieldValues> = Omit<
  SwitchFieldProps,
  'name' | 'checked' | 'onChange' | 'error'
> & {
  name: Path<T>;
};
export const RhfSwitchField = <T extends FieldValues>({
  name,
  ...props
}: RhfSwitchFieldProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <SwitchField
          {...props}
          checked={Boolean(field.value)}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
