import { useIssueContext } from '../../../../features/issue/context/IssueContext';
import styles from './AssignedList.module.scss'

const AssignedList = () => {
  const {state} = useIssueContext()
    return (
      <div className={styles.items}>
         {state.assignedDevices?.map(device =>
         <div className={styles.item} key={device.id}>
          <div className={styles.info}>
            <a href={`/devices/${device.id}`} target='_blank'>
              <span className={styles.name}>{device.name}</span>
              <span className={styles.number}>{device.inventoryNumber}</span>
            </a>
          </div>
          <div className={styles.actions}>
            del
          </div>
         </div>
      )}
      </div>
    )
};

export default AssignedList;
