import {FC} from 'react';
import menu from '../../../../assets/elements/menu.svg'
import menuOpen from '../../../../assets/elements/menu-open.svg'
import style from './BurgerBtn.module.scss';

interface IBurgerBtn {
    action: () => void;
    isActive: boolean;
}

const BurgerBtn: FC<IBurgerBtn> = ({action, isActive}) => {
    return (
        <button className={style.burger} onClick={action}>
            {!isActive
            ?  <img src={menu} alt="" />
            :  <img src={menuOpen} alt="" />
            }
        </button>
    );
};

export default BurgerBtn;