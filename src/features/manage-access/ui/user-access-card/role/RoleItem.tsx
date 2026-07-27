import { Avatar, Button, Card, Col, Flex, Popconfirm, Row, Space, Tag, Typography } from 'antd';
import { FiTrash2 } from 'react-icons/fi';
import { LiaWarehouseSolid } from 'react-icons/lia';
import { LuKeyRound } from 'react-icons/lu';
import { PiCityDuotone } from 'react-icons/pi';

import { UserRolesList } from '@/entities/role/model/types';
import { DeleteConfirm } from '@/features/delete-confirm/ui/DeleteConfirm';

import styles from './RoleItem.module.scss';
import { DESCRIPTION_ACTION, TITLES } from './constants';

interface RoleItemProps {
  role: UserRolesList;
}
export const RoleItem = ({ role }: RoleItemProps) => {
  const handleDeleteRole = () => {
    console.log('was deleted');
  };
  return (
    <Card className={styles.card}>
      <Row gutter={[32, 24]} wrap={false}>
        <Col flex="auto">
          <Flex gap={10} align="flex-start">
            <Avatar size={34} icon={<LuKeyRound />} className={styles.avatar} />
            <Flex vertical gap={20}>
              <Flex gap={40}>
                <Space size={12} wrap>
                  <Typography.Title level={4}>{role.roleName}</Typography.Title>
                </Space>

                <Flex gap={30} align="center">
                  <Flex vertical>
                    <Flex gap={3}>
                      <LiaWarehouseSolid className={styles.icon} />
                      <span className={styles.label}>Склад</span>
                    </Flex>
                    <Typography.Text className={styles.text}>{role.warehouseName}</Typography.Text>
                  </Flex>

                  <Flex vertical>
                    <Flex gap={4}>
                      <PiCityDuotone className={styles.icon} />
                      <span className={styles.label}>Город</span>
                    </Flex>
                    <Typography.Text className={styles.text}>{role.locationName}</Typography.Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex>
            {!!role.permissionsName.length && (
              <Space size={[8, 8]} wrap style={{ marginTop: 15 }}>
                {role.permissionsName.map((permission) => (
                  <Tag key={permission} color="blue" className={styles.permission}>
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
            onConfirm={handleDeleteRole}
          >
            <Button type="text" className={styles.deleteBtn} icon={<FiTrash2 size={18} />} />
          </DeleteConfirm>
        </Col>
      </Row>
    </Card>
  );
};
