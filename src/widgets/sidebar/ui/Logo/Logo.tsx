import { ELEMENTS_LABELS } from '@/utils/constants/ui/elements';

import logo from '../../../../assets/elements/logo.png';
import styles from './Logo.module.scss';

interface LogoProps {
  open: boolean;
}

export const Logo = ({ open }: LogoProps) => {
  return (
    <div className={styles.logo}>
      <img className={styles.image} src={logo} alt="" />
      {open && (
        <div className={styles.content}>
          <span className={styles.title}>IT ASSET PORTAL</span>
          <span className={styles.description}>{ELEMENTS_LABELS.logoText}</span>
        </div>
      )}
    </div>
  );
};
