import { ReactElement } from 'react';

export type AppRouteConfig = {
  path: string;
  element: ReactElement;
  requireAuth: boolean;
};
