import { Flex } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { BiCheck } from 'react-icons/bi';
import { IoCopyOutline } from 'react-icons/io5';
import { IoDocumentTextOutline } from 'react-icons/io5';

import { IssueProcessListItem } from '@/features/issue-device/model/types';
import { copyToClipboard } from '@/shared/lib/clipboard/copyToClipboard';
import { formatDate } from '@/shared/lib/date/formatDate';
import { CustomTag } from '@/shared/ui/custom-tag/CustomTag';

import styles from './RecentIssuances.module.scss';

export const RecentIssuancesColumns = (): ColumnsType<IssueProcessListItem> => [
  {
    key: 'documentNo',
    title: '№ документа',
    render: (_, record) => {
      return (
        <Flex gap={5} align="center">
          <IoDocumentTextOutline className={styles.icon} size={14} />
          <span>{record.documentNo}</span>
          <IoCopyOutline
            size={12}
            style={{
              flexShrink: 0,
              color: 'var(--gray-500)',
              cursor: 'pointer',
            }}
            onClick={() => copyToClipboard(record.documentNo)}
            title="Копировать"
          />
        </Flex>
      );
    },
  },
  {
    key: 'issuedBy',
    title: 'Кто выдал',
    render: (_, record) => {
      return (
        <Flex vertical>
          <span>
            {record.issuedBy.firstNameRu} {record.issuedBy.lastNameRu}
          </span>
          <span className={styles.department}>{record.issuedBy.department?.name}</span>
        </Flex>
      );
    },
  },
  {
    key: 'user',
    title: 'Кому выдали',
    render: (_, record) => {
      return (
        <Flex vertical>
          <span>
            {record.user.firstNameRu} {record.user.lastNameRu}
          </span>
          <span className={styles.department}>{record.user.department?.name}</span>
        </Flex>
      );
    },
  },
  {
    key: 'status',
    title: 'Статус',
    render: () => {
      return (
        <CustomTag icon={BiCheck} iconSize={12} title="Завершено" variant="success" size="sm" />
      );
    },
  },
  {
    key: 'date',
    title: 'Дата',
    render: (_, record) => {
      return <span>{formatDate(record.updatedAt, 'date')}</span>;
    },
  },
];
