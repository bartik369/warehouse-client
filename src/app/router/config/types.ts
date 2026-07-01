import { ReactElement } from 'react';

export type AppRouteConfig = {
  title: string;
  path: string;
  element: ReactElement;
  requireAuth: boolean;
};
