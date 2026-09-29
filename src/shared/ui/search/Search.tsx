import { Input } from 'antd';
import clsx from 'clsx';
import { CiSearch } from 'react-icons/ci';

import styles from './Search.module.scss';

interface SearchProps {
  placeholder: string;
  value: string;
  name?: string;
  className?: string;
  onChange: (value: string) => void;
}

const Search = ({ placeholder, value, name, className, onChange }: SearchProps) => {
  return (
    <Input
      className={clsx(styles.input, className)}
      allowClear
      name={name}
      value={value}
      type="text"
      placeholder={placeholder}
      suffix={<CiSearch className={styles.icon} />}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Search;
