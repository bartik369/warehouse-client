import React from "react";
import { adminMenu } from "../../../utils/data/menus";
import { NavLink } from "react-router-dom";
import styles from "./AdminMenu.module.scss";

const AdminMenu = () => {
  return (
    <nav className={styles.menu}>
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
  );
};

export default AdminMenu;
