import React from "react";
import { useAppSelector } from "../../../../hooks/redux/useRedux";
import { RootState } from "../../../../store/store";
import { IssueState } from "../../../../features/issue/model/issueTypes";

import { BaseDeviceQuery } from "../../../../types/devices";
import { statusNoData } from "../../../../utils/constants/constants";
import styles from './DeviceItem.module.scss';
import DeviceItem from "./DeviceItem";

interface DeviceListProps {
  state: IssueState;
  actions: BaseDeviceQuery;
}
const DeviceList = ({state, actions}: DeviceListProps) => {
    
    const devices = useAppSelector((state: RootState) => state.device.devices);

    let content: React.ReactNode = null;
    if (!devices.length && state.wasSearched) {
      content = <div className={styles.info}>{statusNoData}</div>;
    } else if (!devices.length) {
      return null;
    } else {
      content = <DeviceItem actions={actions} devices={devices} />
    }
    return <div className={styles.userList}>{content}</div>;
};

export default DeviceList;
