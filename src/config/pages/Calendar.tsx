import { AppRouteConfig } from '@/app/router/config/types';
import CalendarPage from '@/pages/calendar/CalendarPage';

const CalendarConfig = {
  title: 'Calendar',
  path: '/calendar',
  element: <CalendarPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default CalendarConfig;
