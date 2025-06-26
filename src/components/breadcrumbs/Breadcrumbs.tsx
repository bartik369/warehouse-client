import { Link, useLocation } from "react-router-dom";
import { routeNameMap } from "../../utils/constants/breadcrumbs";
import { BUTTON_LABELS } from "../../utils/constants/ui/buttons";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiHome3Line } from "react-icons/ri";
import styles from "./Breadcrumbs.module.scss";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className={styles.inner}>
      <ol className={styles.list}>
        <li>
          <Link to="/" className={styles.link}>
            <RiHome3Line className={styles.icon} />
            <span>{BUTTON_LABELS.home}</span>
          </Link>
        </li>
        {pathnames.map((segment, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const name = routeNameMap[segment] || decodeURIComponent(segment);

          return (
            <li key={routeTo}>
              <span className={styles.icon}>
                <MdOutlineKeyboardArrowRight />
              </span>
              {isLast ? (
                <span className={styles.active}>{name}</span>
              ) : (
                <Link to={routeTo}>{name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
