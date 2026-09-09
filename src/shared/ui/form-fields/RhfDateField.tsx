import dayjs from 'dayjs';
import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';

import { DateField } from '../date-field/DateField';
import { DateFieldProps } from '../date-field/types';

type RhfDateFieldProps<T extends FieldValues> = Omit<
  DateFieldProps,
  'name' | 'value' | 'onChange' | 'error'
> & {
  name: Path<T>;
};

export const RhfDateField = <T extends FieldValues>({ name, ...props }: RhfDateFieldProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DateField
          {...props}
          value={field.value ? dayjs(field.value) : null}
          onChange={(date) => {
            field.onChange(date ? date.format('YYYY-MM-DD') : null);
          }}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
