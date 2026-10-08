import { Card, Flex, Typography } from 'antd';
import { LuFileClock } from 'react-icons/lu';
import { LuCalendarClock } from 'react-icons/lu';
import { MdOutlineInventory } from 'react-icons/md';

import { DESCRIPTIONS, TITLES } from '../../model/constants';
import { AttentionItem } from './AttentionItem';
import styles from './AttentionRequired.module.scss';

interface AttentionRequiredProps {
  unfinishedIssuesCount: number;
  isUnfinishedLoading: boolean;
}

export const AttentionRequired = ({
  unfinishedIssuesCount,
  isUnfinishedLoading,
}: AttentionRequiredProps) => {
  return (
    <Card className={styles.card}>
      <Flex vertical gap={10}>
        <Flex vertical>
          <Typography.Title className={styles.title} level={2}>
            {TITLES.attentionRequired}
          </Typography.Title>
          <span className={styles.description}>{DESCRIPTIONS.attentionRequired}</span>
        </Flex>
        <Flex vertical gap={10}>
          <AttentionItem
            title={TITLES.notFinishedTasks}
            description={DESCRIPTIONS.notFinishedTasks}
            value={unfinishedIssuesCount}
            variant="blue"
            icon={<LuFileClock size={16} />}
            link="/issues?page=1&status=draft"
          />
          <AttentionItem
            title={TITLES.activeInventories}
            description={DESCRIPTIONS.activeInventories}
            value={2} // todo убрать моки после реализации логики
            variant="yellow"
            icon={<MdOutlineInventory size={17} />}
          />
          <AttentionItem
            title={TITLES.licensesAndWarranties}
            description={DESCRIPTIONS.licensesAndWarranties}
            value={7} // todo убрать моки после реализации логики
            variant="red"
            icon={<LuCalendarClock size={15} />}
          />
        </Flex>
      </Flex>
    </Card>
  );
};
