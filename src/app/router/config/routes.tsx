import type { RouteObject } from 'react-router-dom';

import { pageConfigs } from '@/config/pages';

export const appRoutes: RouteObject[] = pageConfigs.map((route) => ({
  path: route.path,
  element: route.element,
}));
