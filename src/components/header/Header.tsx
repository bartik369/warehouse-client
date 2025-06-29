import { useLocation } from "react-router-dom";
import HeaderMenu from "../navigates/header/HeaderMenu";
import Search from "../search/Search";
import BurgerBtn from "../ui/buttons/burger/BurgerBtn";
import Profile from "../profile/Profile";
import { useAppSelector} from "@/hooks/redux/useRedux";
import { RootState } from "@/store/store";
import { useStickyHeader } from "@/hooks/data/useStickyHeader";
import styles from "./Header.module.scss";

interface HeaderProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

const Header = ({ isActive, setIsActive }: HeaderProps) => {
  const device = useAppSelector((state: RootState) => state.device.device);
  const status = useAppSelector((state: RootState) => state.device.status);
  const location = useLocation();
  const { isSticky } = useStickyHeader();
  const isDevicePage = /^\/devices\/[a-f0-9-]+$/.test(location.pathname);


  return (
    <header className={`${styles.header} ${isSticky 
      ? styles.sticky 
      : styles.relative}`}
    >
      <BurgerBtn isActive={isActive} action={() => setIsActive(!isActive)} />
      <div className={styles.searchBlock}>
      <Search />
      </div>
      <div className={styles.menuBlock}>
        {(device?.id && (isDevicePage || status)) && <HeaderMenu />}
      </div>
      <Profile />
    </header>
  );
};

export default Header;
