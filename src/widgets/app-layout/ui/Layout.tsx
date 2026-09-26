import { useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

import LocalFallback from '@/shared/ui/error-fallback/LocalFallback';
import { Header } from '@/widgets/header/ui/Header/Header';
import { Sidebar } from '@/widgets/sidebar/ui/sidebar/Sidebar';

import AdminMenu from '../../admin-menu/ui/AdminMenu';
import Footer from '../../footer/Footer';
import styles from './Layout.module.scss';

export const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  return (
    <div className={styles.main}>
      <Sidebar open={isActive} />
      <div className={isActive ? styles.active : styles['not-active']}>
        <Header isActive={isActive} setIsActive={setIsActive} />
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
    </div>
  );
};
