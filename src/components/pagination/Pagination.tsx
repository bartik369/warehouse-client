import {FC} from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


import styles from './Pagination.module.scss';

interface IPaginationProps {
    page: number;
    disabled: {
        left: boolean;
        right: boolean;
    }
    totalPages: number;
    prev:() => void;
    next:() => void;
    setPage:(page: number) => void;
}
const Pagination:FC<IPaginationProps> = ({
    prev, 
    next,
    page,
    disabled,
    totalPages,
    setPage,
}) => {
    const paginationsNumber = [];
    for (let x = 1; x <= totalPages; x++) {
        paginationsNumber.push(x)
    }

    return (
        <div className={styles.wrapper}>
            <nav className={styles.pagination}>
                <button 
                    onClick={prev} 
                    disabled={disabled.left}
                    aria-label='Предыдущая страница'
                >
                <IoIosArrowBack />
                </button>
                <ul className={styles.list}>
                    {paginationsNumber.map((number) => (
                        <li 
                        onClick={() => setPage(number)}
                        key={number} 
                        className={page === number
                            ? styles.active
                            : styles.common
                        }>{number}</li>
                    ))}
                </ul>
                <button 
                onClick={next} 
                disabled={disabled.right}
                arial-label='Следующая страница'
                >
                <IoIosArrowForward />
                </button>
            </nav>
        </div>
    );
};

export default Pagination;