import { NavLink } from "react-router-dom";
// import { adminPanel } from "../../../utils/constants/constants";
import { adminMenu } from "../../../utils/data/menus";
import styles from "./AdminMenu.module.scss";

const AdminMenu = () => {
  return (
    <div className={styles.menu}>
    {/* <div className={styles.title}>{adminPanel}</div> */}
    <nav>
      <ul>
        {adminMenu
          ? adminMenu.map((item) => (
              <li key={item.id}>
                <NavLink to={item.path} className={({ isActive }) => (isActive 
                ? styles.active 
                : styles.default)}
              >
                  <div className={styles.icon}>
                    <item.icon />
                  </div>
                  {item.title}
                </NavLink>
              </li>
            ))
          : "Меню недоступно"}
      </ul>
    </nav>
    </div>
  );
};

export default AdminMenu;
