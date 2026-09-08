import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';

import { SelectField } from '../select-field/SelectField';
import { SelectFieldProps } from '../select-field/types';

type RhfSelectFieldProps<T extends FieldValues> = Omit<
  SelectFieldProps,
  'name' | 'value' | 'onChange' | 'error'
> & {
  name: Path<T>;
  toSelectValue?: (value: any) => any;
  fromSelectValue?: (value: any) => any;
};
export const RhfSelectField = <T extends FieldValues>({
  name,
  toSelectValue,
  fromSelectValue,
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
          allowClear
          value={toSelectValue ? toSelectValue(field.value) : (field.value ?? undefined)}
          onChange={(value) => field.onChange(fromSelectValue ? fromSelectValue(value) : value)}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
