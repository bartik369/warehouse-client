import { TbMenu2, TbMenu4 } from 'react-icons/tb';

import { ELEMENTS_LABELS } from '@/utils/constants/ui/elements';

import style from './BurgerBtn.module.scss';

interface BurgerBtnProps {
  action: () => void;
  isActive: boolean;
}

export const BurgerBtn = ({ isActive, action }: BurgerBtnProps) => {
  return (
    <button className={style.burger} onClick={action} aria-label={ELEMENTS_LABELS.openSidebar}>
      {!isActive ? <TbMenu2 className={style.icon} /> : <TbMenu4 className={style.icon} />}
    </button>
  );
};
