import { MdOutlineEdit } from 'react-icons/md';
import { RiDeleteBin4Line } from 'react-icons/ri';

import { PermissionRole } from '@/entities/permission-role/model/types';

import styles from './PermissionList.module.scss';

interface PermissionItemProps {
  role: PermissionRole;
  onEdit?: (role: PermissionRole) => void;
  onDelete?: (id: string) => void;
}

export const PermissionItem = ({ role, onEdit, onDelete }: PermissionItemProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <div className={styles.title}>{role.roleName}</div>
        <div className={styles.text}>
          {role.warehouseName}
          <span>{role.locationName}</span>
        </div>
        {role?.permissionsName && role.permissionsName.length > 0 && (
          <div className={styles.permissions}>
            {role &&
              role.permissionsName?.map((permission, index) => (
                <span key={index}>{permission}</span>
              ))}
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <button className={styles.btn} onClick={() => onEdit?.(role)}>
          <MdOutlineEdit />
        </button>
        <button
          className={`${styles.btn} ${styles.delete}`}
          onClick={() => onDelete?.(role?.roleId)}
        >
          <RiDeleteBin4Line />
        </button>
      </div>
    </div>
  );
};
