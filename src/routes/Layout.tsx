import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import { ErrorBoundary } from 'react-error-boundary';
import AdminMenu from '../components/navigates/admin/AdminMenu';
import { GlobalModal } from '../components/modal/GlobalModal';
import LocalFallback from '@/components/ui/error/LocalFallback';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import styles from './Layout.module.scss';

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
            <ErrorBoundary FallbackComponent={LocalFallback}>
              <Outlet />
            </ErrorBoundary>
          </div>
        </main>
        <Footer />
      </div>
      <GlobalModal />
    </div>
  );
};

export default Layout;
