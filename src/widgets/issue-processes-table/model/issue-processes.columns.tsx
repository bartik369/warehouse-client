import { Flex } from 'antd';
import { IoCopyOutline } from 'react-icons/io5';
import { record } from 'zod';

import { ISSUE_PROCESS_STATUS_CONFIG } from '@/features/issue-device/model/constants';
import { IssueProcessListItem, IssueProcessStatus } from '@/features/issue-device/model/types';
import { copyToClipboard } from '@/shared/lib/clipboard/copyToClipboard';
import { formatDate } from '@/shared/lib/date/formatDate';
import { CustomTag } from '@/shared/ui/custom-tag/CustomTag';
import { DateTime } from '@/shared/ui/date-time/DateTime';
import { TwoLineText } from '@/shared/ui/two-line-text/TwoLineText';

export const getIssueProcessesColumns = () => {
  return [
    {
      key: 'documentNo',
      title: 'Номер выдачи',
      dataIndex: 'documentNo',
      with: 150,
      sorter: (a: IssueProcessListItem, b: IssueProcessListItem) =>
        a.documentNo.localeCompare(b.documentNo),
      render: (value: string) => {
        return (
          <Flex align="center" gap={10}>
            <span>{value}</span>
            <IoCopyOutline
              size={12}
              style={{ color: 'var(--gray-500)', cursor: 'pointer' }}
              onClick={() => copyToClipboard(value)}
              title="Копировать"
            />
          </Flex>
        );
      },
    },
    {
      key: 'issuedBy',
      title: 'Кто выдал',
      dataIndex: 'issuedBy',
      with: 150,
      sorter: (a: IssueProcessListItem, b: IssueProcessListItem) => {
        const aName = `${a.issuedBy.firstNameRu} ${a.issuedBy.lastNameRu}`;
        const bName = `${b.issuedBy.firstNameRu} ${b.issuedBy.lastNameRu}`;

        return aName.localeCompare(bName);
      },
      render: (issuedBy: IssueProcessListItem['issuedBy']) => {
        const userInfo = `${issuedBy.firstNameRu} ${issuedBy.lastNameRu}`;
        return <TwoLineText primary={userInfo} secondary={issuedBy.department?.name} />;
      },
    },
    {
      key: 'user',
      title: 'Кому выдали',
      dataIndex: 'user',
      with: 200,
      sorter: (a: IssueProcessListItem, b: IssueProcessListItem) => {
        const aName = `${a.user.firstNameRu} ${a.user.lastNameRu}`;
        const bName = `${b.user.firstNameRu} ${b.user.lastNameRu}`;

        return aName.localeCompare(bName);
      },
      render: (user: IssueProcessListItem['user']) => {
        const userInfo = `${user.firstNameRu} ${user.lastNameRu}`;
        return <TwoLineText primary={userInfo} secondary={user.department?.name} />;
      },
    },
    {
      key: 'issueDate',
      title: 'Дата',
      dataIndex: 'issueDate',
      with: 200,
      sorter: (a: IssueProcessListItem, b: IssueProcessListItem) =>
        a.issueDate.localeCompare(b.issueDate),
      render: (value: string) => {
        return <DateTime date={value} />;
      },
    },
    {
      key: 'status',
      title: 'Статус',
      dataIndex: 'status',
      with: 200,
      render: (status: IssueProcessStatus) => {
        const config = ISSUE_PROCESS_STATUS_CONFIG[status];
        return <CustomTag {...config} />;
      },
    },
    {
      key: 'warehouse',
      title: 'Склад',
      dataIndex: 'warehouse',
      sorter: (a: IssueProcessListItem, b: IssueProcessListItem) => {
        const aWarehouse = a.warehouse.name;
        const bWarehouse = a.warehouse.name;
        return aWarehouse.localeCompare(bWarehouse);
      },
      with: 200,
      render: (warehouse: IssueProcessListItem['warehouse']) => {
        return <TwoLineText primary={warehouse?.name} secondary={warehouse.location?.name} />;
      },
    },
  ];
};
