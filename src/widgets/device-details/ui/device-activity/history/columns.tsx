import { Flex } from 'antd';
import { IoCopyOutline } from 'react-icons/io5';

import { copyToClipboard } from '@/shared/lib/clipboard/copyToClipboard';
import { formatDate } from '@/shared/lib/date/formatDate';
import { DeviceHistoryItem, DeviceProcessType } from '@/widgets/device-details/model/types';

import { OperationTypeBadge } from '../operation-type-badge/OperationTypeBadge';

export const getDeviceHistoryColumns = () => [
  {
    key: 'documentNo',
    title: 'Документ',
    dataIndex: 'documentNo',
    width: 115,
    sorter: (a: DeviceHistoryItem, b: DeviceHistoryItem) => {
      if (a.documentNo === null) return 1;
      if (b.documentNo === null) return -1;

      return a.documentNo.localeCompare(b.documentNo);
    },
    render: (value: string) => {
      return (
        <Flex align="center" style={{ width: '100%' }}>
          <span style={{ flex: 1 }}>{value}</span>
          <IoCopyOutline
            size={12}
            style={{
              flexShrink: 0,
              color: 'var(--gray-500)',
              cursor: 'pointer',
            }}
            onClick={() => copyToClipboard(value)}
            title="Копировать"
          />
        </Flex>
      );
    },
  },
  {
    key: 'type',
    title: 'Событие',
    dataIndex: 'type',
    width: 70,
    sorter: true,
    render: (value: DeviceProcessType) => <OperationTypeBadge type={value} />,
  },
  {
    key: 'user',
    title: 'Сотрудник',
    dataIndex: ['user'],
    width: 100,
    sorter: true,
    render: (_: unknown, record: DeviceHistoryItem) => {
      if (!record.user) return '—';
      return `${record.user.lastNameRu} ${record.user.firstNameRu}`;
    },
  },
  {
    key: 'performedBy',
    title: 'Выполнил',
    dataIndex: 'performedBy',
    width: 100,
    sorter: true,
    render: (_: unknown, record: DeviceHistoryItem) => {
      if (!record.performedBy) return '—';
      return `${record.performedBy.lastNameRu} ${record.performedBy.firstNameRu}`;
    },
  },
  {
    key: 'warehouse',
    title: 'Склад',
    sorter: true,
    width: 100,
    render: (record: DeviceHistoryItem) => {
      const processType: DeviceProcessType = record.type;

      if (processType === 'TRANSFER') {
        return (
          <>
            {record.fromWarehouse?.name ?? '—'}
            {' → '}
            {record.toWarehouse?.name ?? '—'}
          </>
        );
      }
      return <>{record.warehouse?.name ?? '—'}</>;
    },
  },
  {
    key: 'date',
    title: 'Дата',
    dataIndex: 'date',
    width: 100,
    sorter: true,
    render: (value: string) => {
      if (!value) return '—';
      return formatDate(value, 'datetime');
    },
  },
];
