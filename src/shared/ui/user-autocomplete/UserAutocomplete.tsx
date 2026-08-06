import { AutoComplete, Input } from 'antd';
import clsx from 'clsx';
import { FiSearch } from 'react-icons/fi';

import { Spinner } from '../spinner/Spinner';
import styles from './UserAutocomplete.module.scss';
import { SEARCH_PROCESS, USER_NOT_FOUND, USER_PLACEHOLDER } from './constants';
import { AutocompleteFieldProps } from './types';

export const UserAutocomplete = ({
  value,
  onChange,
  onOptionSelect,
  onBlur,
  onSearch,
  onClear,
  options,
  loading,
  searched,
  className,
  placeholder = USER_PLACEHOLDER,
  disabled,
}: AutocompleteFieldProps) => {
  const notFoundContent = loading ? (
    <div className={styles.loading}>
      <Spinner color="var(--blue-600)" fontSize={14} />
      <span>{SEARCH_PROCESS}</span>
    </div>
  ) : searched && options?.length === 0 ? (
    USER_NOT_FOUND
  ) : null;

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.inputWrapper}>
        <AutoComplete
          style={{ width: '100%' }}
          value={value}
          options={options}
          disabled={disabled}
          notFoundContent={notFoundContent}
          onSelect={onOptionSelect}
          onChange={onChange}
          onBlur={onBlur}
          onSearch={onSearch}
        >
          <Input
            allowClear
            prefix={<FiSearch size={16} />}
            className={styles.input}
            placeholder={placeholder}
            onClear={onClear}
          />
        </AutoComplete>
      </div>
    </div>
  );
};
