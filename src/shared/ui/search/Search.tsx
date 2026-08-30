import { Input } from 'antd';
import { CiSearch } from 'react-icons/ci';

import styles from './Search.module.scss';

interface SearchProps {
  placeholder: string;
  value: string;
  name?: string;
  onChange: (value: string) => void;
}

const Search = ({ placeholder, value, name, onChange }: SearchProps) => {
  return (
    <Input
      className={styles.input}
      allowClear
      value={value}
      type="text"
      placeholder={placeholder}
      suffix={<CiSearch className={styles.icon} />}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Search;
