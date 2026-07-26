import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';

import { UserAutocomplete } from '../user-autocomplete/UserAutocomplete';
import { AutocompleteFieldProps, UserAutocompleteOption } from '../user-autocomplete/types';

type RhfUserAutocompleteProps<T extends FieldValues> = Omit<
  AutocompleteFieldProps,
  'name' | 'value' | 'onChange' | 'error'
> & {
  name: Path<T>;
  loading?: boolean;
  searched?: boolean;
  onSearch?: (value: string) => void;
  onOptionSelect?: (value: string, option: UserAutocompleteOption) => void;
};
export const RhfUserAutocomplete = <T extends FieldValues>({
  name,
  loading,
  searched,
  onSearch,
  onOptionSelect,
  ...props
}: RhfUserAutocompleteProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <UserAutocomplete
          {...props}
          {...field}
          loading={loading}
          searched={searched}
          value={field.value ?? ''}
          error={fieldState.error?.message}
          onChange={field.onChange}
          onBlur={field.onBlur}
          onSearch={onSearch}
          onOptionSelect={onOptionSelect}
        />
      )}
    />
  );
};
