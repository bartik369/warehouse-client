import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import {
  RoleAssignmentSelect,
  RoleAssignmentSelectProps,
} from '../assignment-role-select/RoleAssignmentSelect';

type RhfRoleAssignmentSelectProps<T extends FieldValues> = Omit<
  RoleAssignmentSelectProps,
  'value' | 'onChange' | 'onBlur' | 'error'
> & { name: Path<T> };

export const RhfRoleAssignmentSelect = <T extends FieldValues>({
  name,
  ...props
}: RhfRoleAssignmentSelectProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <RoleAssignmentSelect
          {...props}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
