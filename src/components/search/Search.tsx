import { search } from '../../utils/constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import style from './Search.module.scss';

const Search = () => {
    return (
        <div className={style.search}>
            <div className={style.glass}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input placeholder={search} type="text" />
        </div>
    );
};

export default Search;