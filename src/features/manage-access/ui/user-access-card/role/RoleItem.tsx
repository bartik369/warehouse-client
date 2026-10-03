import { Avatar, Card, Col, Flex, Row, Space, Tag, Typography } from 'antd';
import { FiTrash2 } from 'react-icons/fi';
import { LiaWarehouseSolid } from 'react-icons/lia';
import { PiCityDuotone } from 'react-icons/pi';

import { UserRoleAssignment } from '@/entities/role/model/types';
import { DeleteConfirm } from '@/features/delete-confirm/ui/DeleteConfirm';
import { userRoleInfo } from '@/features/manage-permission-role/model/constants';
import { IconButton } from '@/shared/ui/icon-button/IconButton';
import { LABELS } from '@/utils/constants/ui/labels';

import styles from './RoleItem.module.scss';
import { ALL_WAREHOUSES, DESCRIPTION_ACTION, TITLES } from './constants';

interface RoleItemProps {
  role: UserRoleAssignment;
  loading: boolean;
  deletingId: string | null;
  onDelete: (id: string) => void;
}
export const RoleItem = ({ role, loading, deletingId, onDelete }: RoleItemProps) => {
  return (
    <Card className={styles.card}>
      <Row gutter={[32, 24]} wrap={false} align="middle">
        <Col flex="auto">
          <Flex gap={5} align="flex-start">
            <Avatar size={34} icon={userRoleInfo[role.roleName].icon} className={styles.avatar} />
            <Flex vertical gap={20}>
              <Flex gap={40}>
                <Space size={12} wrap>
                  <Typography.Title className={styles.title}>{role.roleName}</Typography.Title>
                </Space>
                <Flex gap={30} align="center">
                  <Flex vertical>
                    <Flex gap={3}>
                      <LiaWarehouseSolid className={styles.icon} />
                      <span className={styles.label}>{LABELS.warehouse}</span>
                    </Flex>
                    <Typography.Text className={styles.text}>
                      {role.warehouseName ?? ALL_WAREHOUSES}
                    </Typography.Text>
                  </Flex>
                  <Flex vertical>
                    <Flex gap={4}>
                      <PiCityDuotone className={styles.icon} />
                      <span className={styles.label}>{LABELS.location}</span>
                    </Flex>
                    <Typography.Text className={styles.text}>{role.locationName}</Typography.Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex>
            {role.permissionsName.length > 0 && (
              <Space size={[8, 8]} wrap style={{ marginTop: 15 }}>
                {role.permissionsName.map((permission) => (
                  <Tag key={permission} className={styles.permission}>
                    {permission}
                  </Tag>
                ))}
              </Space>
            )}
          </Flex>
        </Col>
        <Col className={styles.actions}>
          <DeleteConfirm
            title={TITLES.delete_role}
            description={DESCRIPTION_ACTION}
            onConfirm={() => onDelete(role.assignmentId)}
          >
            <IconButton
              icon={FiTrash2}
              iconSize={14}
              variant="danger"
              loading={loading && deletingId === role.assignmentId}
            />
          </DeleteConfirm>
        </Col>
      </Row>
    </Card>
  );
};
