import { AppRouteConfig } from '@/app/router/config/types';
import MessagesPage from '@/pages/messages/MessagesPage';

const MessagesConfig = {
  title: 'Messages',
  path: '/messages',
  element: <MessagesPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default MessagesConfig;
