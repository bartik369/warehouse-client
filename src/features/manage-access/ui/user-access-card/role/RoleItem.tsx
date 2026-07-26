import { Avatar, Button, Card, Col, Flex, Row, Space, Tag, Typography } from 'antd';
import Title from 'antd/es/skeleton/Title';
import { FiTrash2 } from 'react-icons/fi';
import { LuWarehouse } from 'react-icons/lu';
import { LuKeyRound } from 'react-icons/lu';
import { MdLocationOn } from 'react-icons/md';

import { UserRolesList } from '@/entities/role/model/types';

import styles from './RoleItem.module.scss';

interface RoleItemProps {
  role: UserRolesList;
}
export const RoleItem = ({ role }: RoleItemProps) => {
  return (
    <Card>
      <Row gutter={[32, 24]} wrap={false}>
        <Col flex="auto">
          <Flex gap={10} align="flex-start">
            <Avatar size={34} icon={<LuKeyRound />} className={styles.avatar} />
            <Flex vertical gap={20}>
              <Flex gap={40}>
                <Space size={12} wrap>
                  <Typography.Title level={4}>{role.roleName}</Typography.Title>
                </Space>

                <Flex gap={16} align="center">
                  <Flex vertical>
                    <Flex gap={4}>
                      <LuWarehouse className={styles.icon} />
                      <span className={styles.label}>Склад</span>
                    </Flex>
                    <Typography.Text className={styles.text}>{role.warehouseName}</Typography.Text>
                  </Flex>

                  <Flex vertical>
                    <Flex gap={4}>
                      <LuWarehouse className={styles.icon} />
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
              <Space size={[8, 8]} wrap style={{ marginTop: 10 }}>
                {role.permissionsName.map((permission) => (
                  <Tag key={permission} color="blue" className={styles.permission}>
                    {permission}
                  </Tag>
                ))}
              </Space>
            )}
          </Flex>
        </Col>
        <Col>
          <Button type="text" danger icon={<FiTrash2 size={18} />} aria-label="Удалить" />
        </Col>
      </Row>
    </Card>
  );
};
