import {FC} from 'react';
import { IAggregateDeviceInfo } from '../../../types/devices';
import { addedBy, updatedBy, wasAdded, wasUpdated, 
  whoAdded } from '../../../utils/constants/constants';
import { TbUserSquareRounded } from "react-icons/tb";
import styles from './Device.module.scss';
interface IUserInfoProps {
    device: IAggregateDeviceInfo
}
const UserInfo:FC<IUserInfoProps> = ({ device }) => {
    return (
        <div className={styles.user}>
             <div className={styles.title}>
                <div className={styles.icon}>
                <TbUserSquareRounded />
                </div>
                <span>{whoAdded}</span>
            </div>
            <div className={styles.block}>
                <div className={styles.value}>
                  {device.addedBy.firstName}  {device.addedBy.lastName}
                </div>
                <div className={styles.name}>{addedBy}</div>
          </div>
          <div className={styles.block}>
                <div className={styles.value}>
                  {device.updatedBy.firstName}  {device.updatedBy.lastName}
                </div>
                <div className={styles.name}>{updatedBy}</div>
          </div>
          <div className={styles.block}>
                <div className={styles.value}>
                  {device.createdAt && new Date(device.createdAt).toLocaleString("ru-RU")}
                </div>
                <div className={styles.name}>{wasAdded}</div>
          </div>
          <div className={styles.block}>
                <div className={styles.value}>
                  {device.updatedAt && new Date(device.updatedAt).toLocaleString("ru-RU")}
                </div>
                <div className={styles.name}>{wasUpdated}</div>
          </div>

        </div>
    );
};

export default UserInfo;