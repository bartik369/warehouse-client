import {FC} from 'react';
import { TbMenu2 } from "react-icons/tb";
import { TbMenu4 } from "react-icons/tb";
import style from './BurgerBtn.module.scss';

interface IBurgerBtn {
    action: () => void;
    isActive: boolean;
}

const BurgerBtn: FC<IBurgerBtn> = ({action, isActive}) => {
    return (
        <button className={style.burger} onClick={action}>
            {!isActive
            ?  <TbMenu2 className={style.icon}/>
            :  <TbMenu4 className={style.icon}/>
            }
        </button>
    );
};

export default BurgerBtn;