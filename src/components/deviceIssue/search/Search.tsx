import { CgCloseO } from 'react-icons/cg';
import { IoSearch } from "react-icons/io5";
import styles from './Search.module.scss';

interface BaseSearchActions {
  handleChange: (value: string) => void;
  handleReset: () => void;
  handleSearch?: () => void;
}

interface SearchProps {
  placeholder: string;
  value: string;
  name?: string;
  actions: BaseSearchActions;
}

const Search = ({ placeholder, actions, value, name }: SearchProps) => {
  return (
    <div className={styles.input}>
      <input
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={(e) => actions.handleChange(e.target.value)}
      />
      {value?.length > 0 && (
        name === 'email' ? (
          <CgCloseO
            className={styles.icon}
            onClick={actions.handleReset}
          />
        ) : (
          <IoSearch
            className={styles.icon}
            onClick={actions.handleSearch}
          />
        )
      )}
    </div>
  );
};

export default Search;
