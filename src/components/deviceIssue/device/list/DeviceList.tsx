import React from 'react';

import { IssueState } from '@/features/issue/model/issueTypes';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { RootState } from '@/store/store';
import { BaseIssueQuery } from '@/types/issue';
import { MESSAGES } from '@/utils/constants/ui/messages';

import DeviceItem from './DeviceItem';
import styles from './DeviceItem.module.scss';

interface DeviceListProps {
  state: IssueState;
  actions: BaseIssueQuery;
}
const DeviceList = ({ state, actions }: DeviceListProps) => {
  const devices = useAppSelector((state: RootState) => state.device.devices);

  let content: React.ReactNode = null;
  if (!devices.length && state.wasSearched) {
    content = <div className={styles.info}>{MESSAGES.noData}</div>;
  } else if (!devices.length) {
    return null;
  } else {
    content = <DeviceItem actions={actions} devices={devices} />;
  }
  return <div className={styles.userList}>{content}</div>;
};

export default DeviceList;
