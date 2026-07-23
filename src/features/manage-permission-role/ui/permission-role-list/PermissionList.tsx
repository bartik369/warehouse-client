import { Empty, Flex } from 'antd';

import { createRoleScopeKey } from '@/entities/permission-role/lib/create-role-scope-key';
import { PermissionRole } from '@/entities/permission-role/model/types';
import { Spinner } from '@/shared/ui/spinner/Spinner';

import { PermissionItem } from './PermissionItem';
import styles from './PermissionList.module.scss';

interface PermissionListProps {
  loading: boolean;
  fetching: boolean;
  roles: PermissionRole[];
  onEdit?: (role: PermissionRole) => void;
  onDelete?: (id: string) => void;
}

export const PermissionList = ({
  loading,
  fetching,
  roles,
  onEdit,
  onDelete,
}: PermissionListProps) => {
  const isLoading = fetching || loading;
  return (
    <div className={styles.list}>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : roles.length === 0 ? (
        <Empty />
      ) : (
        <Flex vertical>
          {roles.map((role) => (
            <PermissionItem
              key={createRoleScopeKey(role)}
              role={role}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </Flex>
      )}
    </div>
  );
};
