import { useEffect, useState } from 'react';

import { Breadcrumb } from 'antd';
import { RiHome3Line } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

import { routeNameMap } from '@/utils/constants/breadcrumbs';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { useEntityNameResolver } from '@/widgets/breadcrumbs/model/useEntityNameResolver';

import styles from './Breadcrumbs.module.scss';

const UUID_REGEXP = /^[0-9a-fA-F-]{36}$/;

export const Breadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(Boolean);

  const [pathName, setPathName] = useState<string | null>(null);

  const { resolveEntityName } = useEntityNameResolver();

  const uuidSegment = pathnames.find((segment) => UUID_REGEXP.test(segment));

  const isEditPage = pathnames.at(-1) === 'edit';

  useEffect(() => {
    if (!uuidSegment) {
      setPathName(null);
      return;
    }

    resolveEntityName(location.pathname).then(setPathName);
  }, [uuidSegment, location.pathname, resolveEntityName]);

  const items = [
    {
      title: (
        <Link to="/" className={styles.home}>
          <RiHome3Line className={styles.icon} />
          <span>{BUTTON_LABELS.home}</span>
        </Link>
      ),
    },

    ...pathnames.map((segment, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      const isUuid = UUID_REGEXP.test(segment);
      const title = isUuid ? pathName || 'Загрузка...' : routeNameMap[segment] || segment;
      const shouldDisableEntityLink = isEditPage && isUuid;

      if (isLast) {
        return {
          title: <span className={styles.active}>{title}</span>,
        };
      }

      if (shouldDisableEntityLink) {
        return {
          title: <span className={styles.link}>{title}</span>,
        };
      }

      return {
        title: (
          <Link className={styles.link} to={routeTo}>
            {title}
          </Link>
        ),
      };
    }),
  ];

  return <Breadcrumb className={styles.inner} items={items} />;
};
