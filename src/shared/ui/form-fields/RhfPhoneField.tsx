import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';

import { PhoneField, PhoneFieldProps } from '../phone-field/PhoneField';

type RhfPhoneFieldProps<T extends FieldValues> = Omit<
  PhoneFieldProps,
  'name' | 'value' | 'onChange' | 'error'
> & {
  name: Path<T>;
};

export const RhfPhoneField = <T extends FieldValues>({ name, ...props }: RhfPhoneFieldProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <PhoneField
          {...props}
          name={field.name}
          value={field.value ?? ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
