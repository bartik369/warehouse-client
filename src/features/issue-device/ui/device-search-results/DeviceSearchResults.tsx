import React from 'react';

import { IssueState } from '@/features/issue-device/model/issueTypes';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { RootState } from '@/store/store';
import { AssignedDevice, BaseIssueQuery } from '@/types/issue';
import { MESSAGES } from '@/utils/constants/ui/messages';

import { DeviceList } from './DeviceList';
import styles from './DeviceSearchResults.module.scss';

interface DeviceSearchResultsProps {
  state: IssueState;
  setDevice: (item: AssignedDevice) => void;
}
export const IssueDeviceList = ({ state, setDevice }: DeviceSearchResultsProps) => {
  const devices = useAppSelector((state: RootState) => state.device.devices);

  let content: React.ReactNode = null;
  if (!devices.length && state.wasSearched) {
    content = <div className={styles.info}>{MESSAGES.noData}</div>;
  } else if (!devices.length) {
    return null;
  } else {
    content = <DeviceList setDevice={setDevice} devices={devices} />;
  }
  return <div className={styles.userList}>{content}</div>;
};
