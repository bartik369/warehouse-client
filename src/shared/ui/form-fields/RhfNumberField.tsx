import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';

import { NumberField } from '../number-field/NumberField';
import { NumberFieldProps } from '../number-field/types';

type RhfNumberFieldProps<T extends FieldValues> = Omit<
  NumberFieldProps,
  'name' | 'value' | 'onChange' | 'error'
> & {
  name: Path<T>;
  tooltip?: string;
};

export const RhfNumberField = <T extends FieldValues>({
  name,
  tooltip,
  ...props
}: RhfNumberFieldProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <NumberField
          {...props}
          {...field}
          value={field.value ?? null}
          error={fieldState.error?.message}
          tooltip={tooltip}
        />
      )}
    />
  );
};
