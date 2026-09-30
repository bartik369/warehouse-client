import { TbMenu2, TbMenu4 } from 'react-icons/tb';

import style from './BurgerBtn.module.scss';

interface BurgerBtnProps {
  action: () => void;
  isActive: boolean;
}

export const BurgerBtn = ({ isActive, action }: BurgerBtnProps) => {
  return (
    <button className={style.burger} onClick={action}>
      {!isActive ? <TbMenu2 size={18} /> : <TbMenu4 className={style.icon} />}
    </button>
  );
};
