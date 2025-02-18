import { FC } from "react";
import {prevPage, nextPage } from "../../utils/constants/constants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./Pagination.module.scss";

interface IPaginationProps {
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
const Pagination: FC<IPaginationProps> = ({
  page,
  disabled,
  totalPages,
  prev,
  next,
  setPage,
}) => {
  const paginationsNumber = [];

  for (let x = 1; x <= totalPages; x++) {
    paginationsNumber.push(x);
  }

  return (
    <div className={styles.wrapper}>
      <nav className={styles.pagination}>
        <button
          onClick={prev}
          disabled={disabled.left}
          aria-label={prevPage}>
          <IoIosArrowBack aria-hidden={true} />
        </button>
        <ul className={styles.list}>
          {paginationsNumber.map((number) => (
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
          aria-label={nextPage}>
          <IoIosArrowForward aria-hidden={true} />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
