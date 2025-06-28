import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BUTTON_LABELS } from '../../utils/constants/ui/buttons';
import styles from './Pagination.module.scss';

interface PaginationProps {
  page: number;
  disabled: {
    left: boolean;
    right: boolean;
  };
  totalPages: number;
  prev: () => void;
  next: () => void;
  setPage: (page: number) => void;
}
const Pagination = ({
  page,
  disabled,
  totalPages,
  prev,
  next,
  setPage,
}:PaginationProps) => {
  const paginationNumber: number[] = [];

  for (let x = 1; x <= totalPages; x++) {
    paginationNumber.push(x);
  }

  return (
    <div className={styles.wrapper}>
      <nav className={styles.pagination}>
        <button
          onClick={prev}
          disabled={disabled.left}
          aria-label={BUTTON_LABELS.prevPage}>
          <IoIosArrowBack aria-hidden={true} />
        </button>
        <ul className={styles.list}>
          {paginationNumber.map((number) => (
            <li
              role={'button'}
              key={number}
              tabIndex={0}
              className={page === number ? styles.active : styles.common}
              onClick={() => setPage(number)}
            >
              {number}
            </li>
          ))}
        </ul>
        <button
          onClick={next}
          disabled={disabled.right}
          aria-label={BUTTON_LABELS.nextPage}>
          <IoIosArrowForward aria-hidden={true} />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
