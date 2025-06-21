import { statusNoData } from '../../../utils/constants/constants';
import styles from './NoData.module.scss';

const NoData = () => {
    return (
        <div className={styles.info}>
            {statusNoData}
        </div>
    );
};

export default NoData;