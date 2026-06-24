import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';

import { TextField } from '../text-field/TextField';
import { TextFieldProps } from '../text-field/types';

type RhfTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'name' | 'value' | 'onChange' | 'error'
> & {
  name: Path<T>;
};

export const RhfTextField = <T extends FieldValues>({ name, ...props }: RhfTextFieldProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...props}
          {...field}
          value={field.value ?? ''}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
