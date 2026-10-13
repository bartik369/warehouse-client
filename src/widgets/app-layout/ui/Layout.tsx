import { useState } from 'react';

import clsx from 'clsx';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, matchPath, useLocation } from 'react-router-dom';

import privateRoutes from '@/config/routes/privateRoutes';
import LocalFallback from '@/shared/ui/error-fallback/LocalFallback';
import { Header } from '@/widgets/header/ui/Header/Header';
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar/Sidebar';

import AdminMenu from '../../admin-menu/ui/AdminMenu';
import Footer from '../../footer/Footer';
import styles from './Layout.module.scss';

export const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const currentRoute = privateRoutes.find(({ path }) =>
    (Array.isArray(path) ? path : [path]).some((p) =>
      matchPath({ path: p, end: true }, location.pathname)
    )
  );

  const layoutWidth = currentRoute?.layout ?? 'default';

  return (
    <div className={styles.main}>
      <Sidebar open={isActive} />
      <div className={isActive ? styles.active : styles['not-active']}>
        <Header layoutWidth={layoutWidth} isActive={isActive} setIsActive={setIsActive} />
        <main className={clsx(styles.outlet, styles[layoutWidth])}>
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
