import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import AdminMenu from '../components/navigates/admin/AdminMenu';
import styles from './Layout.module.scss';
import { GlobalModal } from '../components/modal/GlobalModal';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  return (
    <div className={styles.main}>
      <Sidebar open={isActive} />
      <div className={isActive ? styles.active : styles["not-active"]}>
        <Header isActive={isActive} setIsActive={setIsActive} />
        <Breadcrumbs />
        <main className={styles.outlet}>
          {location.pathname.startsWith("/admin") && <AdminMenu />}
          <div className={styles.content}>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
      <GlobalModal />
    </div>
  );
};

export default Layout;
