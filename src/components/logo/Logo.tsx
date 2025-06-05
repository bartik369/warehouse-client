import { MdBarcodeReader } from "react-icons/md";
import { IoBarcodeOutline } from "react-icons/io5";
import styles from './Logo.module.scss';

interface ILogoProps {
    open: boolean;
}

const Logo = ({ open }: ILogoProps) => {
  const Icon = open ? IoBarcodeOutline : MdBarcodeReader;
  const style = open ? styles.icon : styles.active;
  return (
    <div className={styles.logo}>
      <Icon className={style} />
      {open && <span>ITAM</span>}
    </div>
  );
};

export default Logo;