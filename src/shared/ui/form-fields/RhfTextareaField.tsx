import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';

import { TextareaField } from '../textarea-field/TextareaField';
import { TextareaFieldProps } from '../textarea-field/types';

type RhfTextareaFieldProps<T extends FieldValues> = Omit<
  TextareaFieldProps,
  'name' | 'value' | 'onChange' | 'error'
> & { name: Path<T> };

export const RhfTextareaField = <T extends FieldValues>({
  name,
  ...props
}: RhfTextareaFieldProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextareaField
          {...props}
          {...field}
          value={field.value ?? ''}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
