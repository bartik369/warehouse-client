import { TbMenu2, TbMenu4  } from 'react-icons/tb';
import { openSidebar } from '../../../../utils/constants/constants';
import style from './BurgerBtn.module.scss';

interface BurgerBtn {
    action: () => void;
    isActive: boolean;
}

const BurgerBtn = ({ isActive, action }:BurgerBtn) => {
    return (
        <button className={style.burger} onClick={action} aria-label={openSidebar}>
            {!isActive
              ? <TbMenu2 className={style.icon}/>
              : <TbMenu4 className={style.icon}/>
            }
        </button>
    );
};

export default BurgerBtn;