import {FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import style from './BurgerBtn.module.scss';

interface IBurgerBtn {
    action: () => void;
    isActive: boolean;
}

const BurgerBtn: FC<IBurgerBtn> = ({action, isActive}) => {
    return (
        <button className={style.burger} onClick={action}>
            {!isActive
            ?  <FontAwesomeIcon className={style.icon} icon={faBars}/>
            :  <FontAwesomeIcon className={style.icon} icon={faBarsStaggered}/>
            }
        </button>
    );
};

export default BurgerBtn;