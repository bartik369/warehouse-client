import { skipToken } from '@reduxjs/toolkit/query';
import { Flex } from 'antd';
import { IoArrowBack } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/routes/routes';
import { BackToListButton } from '@/shared/ui/back-to-list-button/BackToListButton';
import { useGetDevicesByIssueProcessQuery } from '@/store/api/devicesApi';
import { useGetIssueProcessQuery } from '@/store/api/issueApi';

import { DeviceList } from './device-list/DeviceList';
import { IssueHeader } from './issue-header/IssueHeader';
import { IssueProcessDetails } from './process-details/IssueProcessDetails';
import { ProcessFile } from './process-file/ProcessFile';

export const EquipmentIssuanceInfo = () => {
  const { id } = useParams();
  const { data: issueDetail } = useGetIssueProcessQuery(id ?? skipToken);
  const { data: devices = [], isLoading } = useGetDevicesByIssueProcessQuery(id ?? skipToken);
  const navigate = useNavigate();
  if (!issueDetail) return null;
  return (
    <Flex vertical gap={20}>
      <IssueHeader detail={issueDetail} />
      <Flex gap={20}>
        <Flex flex={'7 1 0'} vertical gap={20}>
          <DeviceList devices={devices} loading={isLoading} />
          <ProcessFile detail={issueDetail} />
          <div>
            <BackToListButton title="Назад к списку" onClick={() => navigate(ROUTES.ISSUES)}>
              <IoArrowBack size={15} />
            </BackToListButton>
          </div>
        </Flex>
        <IssueProcessDetails detail={issueDetail} />
      </Flex>
    </Flex>
  );
};
