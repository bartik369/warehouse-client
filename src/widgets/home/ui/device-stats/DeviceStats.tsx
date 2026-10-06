import { Flex } from 'antd';
import { MdMiscellaneousServices } from 'react-icons/md';
import { PiDevicesBold } from 'react-icons/pi';
import { TbBuildingWarehouse, TbDeviceDesktopOff } from 'react-icons/tb';
import { VscServerProcess } from 'react-icons/vsc';

import { StatCard } from '@/widgets/stat-card/ui/StatCard';
import { CircularProgress } from '@/widgets/stat-card/ui/circular-progress/CircularProgress';

import styles from './DeviceStats.module.scss';

interface DeviceStatsProps {
  loading: boolean;
  totalCount: number;
  assignedCount: number;
  availableCount: number;
  underRepairCount: number;
}

export const DeviceStats = ({
  loading,
  totalCount,
  assignedCount,
  availableCount,
  underRepairCount,
}: DeviceStatsProps) => {
  return (
    <Flex className={styles.container}>
      <StatCard
        icon={<PiDevicesBold size={18} />}
        label="Всего устройств"
        value={totalCount}
        description="В компании"
        colorVariant="blue"
        loading={loading}
      ></StatCard>
      <StatCard
        icon={<VscServerProcess size={18} />}
        label="В эксплуатации"
        value={assignedCount}
        description="Исползуются"
        colorVariant="green"
        loading={loading}
      >
        <CircularProgress colorVariant="green" percent={10} size={50} />
      </StatCard>
      <StatCard
        icon={<TbBuildingWarehouse size={18} />}
        label="На складах"
        value={availableCount}
        description="Доступны"
        colorVariant="blue"
        loading={loading}
      >
        <CircularProgress colorVariant="blue" percent={10} size={50} />
      </StatCard>
      <StatCard
        icon={<MdMiscellaneousServices size={18} />}
        label="На обслуживании"
        value={underRepairCount}
        description="В ремонте"
        colorVariant="yellow"
        loading={loading}
      >
        <CircularProgress colorVariant="yellow" percent={10} size={50} />
      </StatCard>
      <StatCard
        icon={<TbDeviceDesktopOff size={18} />}
        label="Списано"
        value={4} //todo в будущем размокать, когда будет логика
        description="Не используется"
        colorVariant="red"
      >
        <CircularProgress colorVariant="red" percent={10} size={50} />
      </StatCard>
    </Flex>
  );
};
