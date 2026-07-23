import { useMemo } from 'react';

import { Checkbox, Flex, Select, type SelectProps, Tag, Typography } from 'antd';
import clsx from 'clsx';
import { LuWarehouse } from 'react-icons/lu';
import { LuUser } from 'react-icons/lu';

import { createRoleScopeKey } from '@/entities/permission-role/lib/create-role-scope-key';
import type { PermissionRole, UserRoleAssignment } from '@/entities/permission-role/model/types';

import styles from './RoleAssignmentSelect.module.scss';

export interface RoleAssignmentSelectProps {
  roles: PermissionRole[];
  value?: string[];
  assignedRoles?: UserRoleAssignment[];
  prefix?: React.ReactNode;
  label: string;
  error?: string;
  className?: string;
  placeholder?: string;
  loading?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  status?: 'error' | 'warning';
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
}

type RoleAssignmentOption = {
  value: string;
  label: React.ReactNode;
  role: PermissionRole;
  disabled: boolean;
};

export const RoleAssignmentSelect = ({
  roles,
  value = [],
  assignedRoles = [],
  label,
  error,
  prefix,
  className,
  status,
  placeholder,
  loading = false,
  disabled,
  allowClear = true,
  onChange,
  onBlur,
}: RoleAssignmentSelectProps) => {
  const isFilled = value.length > 0;

  const assignedScopeKeys = useMemo(
    () => new Set(assignedRoles.map((role) => createRoleScopeKey(role))),
    [assignedRoles]
  );

  const options = useMemo<RoleAssignmentOption[]>(
    () =>
      roles.map((role) => {
        const scopeKey = createRoleScopeKey(role);
        return {
          value: scopeKey,
          label: (
            <Flex gap={6} align="center" className={styles.customLabel}>
              <Typography.Text className={styles.name}>{role.roleName}</Typography.Text>
              {role.warehouseName && (
                <>
                  {' '}
                  <Typography.Text className={styles.warehouse}>
                    {role.warehouseName}
                  </Typography.Text>
                </>
              )}
              {role.locationName && (
                <>
                  {' '}
                  <Typography.Text className={styles.city}>{role.locationName}</Typography.Text>
                </>
              )}
            </Flex>
          ),
          role,
          disabled: assignedScopeKeys.has(scopeKey),
        };
      }),
    [roles, assignedScopeKeys]
  );

  const optionRender: SelectProps<string[], RoleAssignmentOption>['optionRender'] = (option) => {
    const { role, disabled: optionDisabled } = option.data;

    const scopeKey = createRoleScopeKey(role);
    const checked = value.includes(scopeKey);

    return (
      <div className={styles.option}>
        <Checkbox checked={checked} disabled={optionDisabled} className={styles.checkbox} />

        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <LuUser />
            </div>
            <div className={styles.info}>
              <div className={styles.nameRow}>
                <div className={styles.name}>{role.roleName ?? 'Без названия'}</div>
                {optionDisabled && <Tag className={styles.assignedTag}>Уже назначено</Tag>}
              </div>
              <div className={styles.location}>
                <LuWarehouse />
                {role.warehouseName && (
                  <span className={styles.warehouse}>{role.warehouseName}</span>
                )}
                <span className={styles.city}>{role.locationName}</span>
              </div>
            </div>
          </div>
          {!!role.permissionsName?.length && (
            <div className={styles.permissions}>
              {role.permissionsName.map((permission) => (
                <Tag className={styles.tag} key={permission}>
                  {permission}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.selectWrapper}>
        <Select<string[], RoleAssignmentOption>
          className={styles.select}
          classNames={{
            popup: {
              root: styles.dropdown,
            },
          }}
          prefix={prefix}
          mode="multiple"
          value={value}
          options={options}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          allowClear={allowClear}
          status={status}
          maxTagCount="responsive"
          showSearch={false}
          onChange={onChange}
          onBlur={onBlur}
          optionRender={optionRender}
        />
        <label className={clsx(styles.label, isFilled && styles.labelActive)}>{label}</label>
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
