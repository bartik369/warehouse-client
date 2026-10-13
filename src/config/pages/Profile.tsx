import { AppRouteConfig } from '@/app/router/config/types';
import ProfilePage from '@/pages/profile/ProfilePage';

const ProfileConfig = {
  title: 'Profile',
  path: '/profile',
  element: <ProfilePage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default ProfileConfig;
