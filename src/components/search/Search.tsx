import { useState } from 'react';
import { search } from '../../utils/constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons';
import style from './Search.module.scss';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className={style.search}>
            <div className={style.glass}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder={search} 
                value={searchQuery}
                type="text" 
            />
            {searchQuery &&
            <div className={style.close} onClick={() => setSearchQuery('')}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
            }
        </div>
    );
};

export default Search;