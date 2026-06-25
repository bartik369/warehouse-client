import { useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

import LocalFallback from '@/components/ui/error/LocalFallback';

import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { GlobalModal } from '../components/modal/GlobalModal';
import AdminMenu from '../components/navigates/admin/AdminMenu';
import Sidebar from '../widgets/sidebar/ui/Sidebar/Sidebar';
import styles from './Layout.module.scss';

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  return (
    <div className={styles.main}>
      <Sidebar open={isActive} />
      <div className={isActive ? styles.active : styles['not-active']}>
        <Header isActive={isActive} setIsActive={setIsActive} />
        <Breadcrumbs />
        <main className={styles.outlet}>
          {location.pathname.startsWith('/admin') && <AdminMenu />}
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
