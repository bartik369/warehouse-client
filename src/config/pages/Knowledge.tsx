import { AppRouteConfig } from '@/app/router/config/types';
import KnowledgePage from '@/pages/knowledge/KnowledgePage';

const KnowledgeConfig = {
  title: 'Knowledge',
  path: '/knowledge',
  element: <KnowledgePage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default KnowledgeConfig;
