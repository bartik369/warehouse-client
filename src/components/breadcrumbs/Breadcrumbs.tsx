import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEntityNameResolver } from "@/hooks/data/useEntityNameResolver";
import { routeNameMap } from "@/utils/constants/breadcrumbs";
import { BUTTON_LABELS } from "@/utils/constants/ui/buttons";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiHome3Line } from "react-icons/ri";
import styles from "./Breadcrumbs.module.scss";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [isUuid, setIsUuid] = useState(false);
  const [pathName, setPathName] = useState<string | null>(null)
  const { resolveEntityName } = useEntityNameResolver();

  const isLast = pathnames.at(-1);
  const regEx = /^[0-9a-fA-F-]{36}$/;
  const isUuidFormat = regEx.test(isLast || '');

  useEffect(() => {
    async function fetchName(path: string) {
      const data = await resolveEntityName(path);
      setPathName(data);
    }
    if (isUuidFormat) {
      setIsUuid(true);
      fetchName(location.pathname)
    } else {
      setIsUuid(false);
      setPathName(null);
    }
  }, [location.pathname]);

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
          const name = (isUuid && isLast) ? pathName :  routeNameMap[segment]

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
