import { Badge, Card, Empty, Flex, Tabs, Typography } from 'antd';
import { VscArrowSmallRight } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

import { DESCRIPTIONS, LABELS, TITLES } from '../../model/constants';
import { mockInventoryOverview } from '../../model/mocks';
import { InventoryItem } from './InventoryItem';
import styles from './InventoryOverview.module.scss';

export const InventoryOverview = () => {
  const activeCount = 1; // Пока мок
  const items = [
    {
      key: 'completed',
      label: 'Завершённые',
      children: <InventoryItem percent={100} data={mockInventoryOverview.completed} />,
    },
    {
      key: 'active',
      label: (
        <span>
          Активные
          {activeCount > 0 && (
            <Badge color="var(--green-400)" status="processing" style={{ marginLeft: 8 }} />
          )}
        </span>
      ),
      children: (
        <>
          {activeCount > 0 ? (
            <InventoryItem percent={71} data={mockInventoryOverview.active} />
          ) : (
            <Empty />
          )}
        </>
      ),
    },
  ];
  return (
    <Card className={styles.card}>
      <Flex align="center" justify="space-between">
        <Flex vertical>
          <Typography.Title className={styles.title} level={2}>
            {TITLES.deviceInventory}
          </Typography.Title>
          <span className={styles.description}>{DESCRIPTIONS.deviceInventory}</span>
        </Flex>
        <Link className={styles.link} to="#">
          <span>{LABELS.allInventory}</span>
          <VscArrowSmallRight size={18} />
        </Link>
      </Flex>
      <Tabs className={styles.tabs} items={items} />
    </Card>
  );
};
