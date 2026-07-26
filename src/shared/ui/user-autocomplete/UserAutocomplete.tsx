import { AutoComplete, Input } from 'antd';
import clsx from 'clsx';
import { HiOutlineEnvelope } from 'react-icons/hi2';

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
  options,
  loading,
  searched,
  className,
  placeholder = USER_PLACEHOLDER,
  disabled,
}: AutocompleteFieldProps) => {
  const notFoundContent = loading ? (
    <div className={styles.loading}>
      <Spinner fontSize={11} />
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
            prefix={<HiOutlineEnvelope />}
            className={styles.input}
            placeholder={placeholder}
          />
        </AutoComplete>
      </div>
    </div>
  );
};
