import { skipToken } from '@reduxjs/toolkit/query';
import { Flex } from 'antd';
import { useParams } from 'react-router-dom';

import { ActionButton } from '@/shared/ui/action-button/ActionButton';
import { useGetDevicesByIssueProcessQuery } from '@/store/api/devicesApi';
import { useGetIssueProcessQuery } from '@/store/api/issueApi';

import { DeviceList } from './device-list/DeviceList';
import { IssueHeader } from './issue-header/IssueHeader';
import { IssueProcessDetails } from './process-details/IssueProcessDetails';
import { ProcessFile } from './process-file/ProcessFile';

export const EquipmentIssuanceInfo = () => {
  const { id } = useParams();
  const { data: issueDetail } = useGetIssueProcessQuery(id ?? skipToken);
  const { data: devices = [] } = useGetDevicesByIssueProcessQuery(id ?? skipToken);
  if (!issueDetail) return null;
  return (
    <Flex vertical gap={20}>
      <IssueHeader detail={issueDetail} />
      <Flex gap={20}>
        <Flex flex={'7 1 0'} vertical gap={20}>
          <DeviceList devices={devices} />
          <ProcessFile detail={issueDetail} />
          <div>
            <button>Назад к списку</button>
          </div>
        </Flex>
        <IssueProcessDetails detail={issueDetail} />
      </Flex>
    </Flex>
  );
};
