import { UserRole } from '@/entities/permission-role/model/types';

import { userRoleInfo } from './constants';

export type UserRoleInfo = (typeof userRoleInfo)[UserRole];
