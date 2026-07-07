import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';

import { SelectField } from '../select-field/SelectField';
import { SelectFieldProps } from '../select-field/types';

type RhfSelectFieldProps<T extends FieldValues> = Omit<
  SelectFieldProps,
  'name' | 'value' | 'onChange' | 'error'
> & { name: Path<T> };
export const RhfSelectField = <T extends FieldValues>({
  name,
  ...props
}: RhfSelectFieldProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <SelectField
          {...props}
          value={field.value ?? undefined}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
