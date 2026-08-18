export const ROUTES = {
  HOME: '/',
  ISSUES: '/issues',
  USERS: '/users',
  DEVICES: '/devices',

  ISSUE: (id: string) => `/issues/${id}`,
} as const;
