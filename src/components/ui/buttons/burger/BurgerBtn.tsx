import {FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark} from '@fortawesome/free-solid-svg-icons';
import style from './BurgerBtn.module.scss';

interface IBurgerBtn {
    action: () => void;
    isActive: boolean;
}

const BurgerBtn: FC<IBurgerBtn> = ({action, isActive}) => {
    return (
        <button className={style.burger} onClick={action}>
            {!isActive
            ?  <FontAwesomeIcon icon={faBars}/>
            :  <FontAwesomeIcon icon={faXmark}/>
            }
        </button>
    );
};

export default BurgerBtn;