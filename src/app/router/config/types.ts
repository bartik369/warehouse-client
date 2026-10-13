import { ReactElement } from 'react';

import { PageLayoutWidth } from '@/widgets/app-layout/model/types';

export type AppRouteConfig = {
  title: string;
  path: string;
  element: ReactElement;
  requireAuth: boolean;
  layout: PageLayoutWidth;
};
