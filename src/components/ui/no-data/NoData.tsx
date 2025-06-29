import { MESSAGES } from '@/utils/constants/ui/messages';
import styles from './NoData.module.scss';

const NoData = () => {
    return (
        <div className={styles.info}>
            {MESSAGES.noData}
        </div>
    );
};

export default NoData;