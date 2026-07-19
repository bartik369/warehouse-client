import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import { PermissionsSelect, PermissionsSelectProps } from '../permissions-select/PermissionsSelect';

type RhfPermissionsSelectProps<T extends FieldValues> = Omit<
  PermissionsSelectProps,
  'value' | 'onChange' | 'onBlur' | 'error'
> & {
  name: Path<T>;
};
export const RhfPermissionsSelect = <T extends FieldValues>({
  name,
  ...props
}: RhfPermissionsSelectProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <PermissionsSelect
          {...props}
          value={Array.isArray(field.value) ? field.value : []}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
