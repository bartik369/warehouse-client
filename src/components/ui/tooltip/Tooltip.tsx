import { BsQuestionSquare } from "react-icons/bs";
import styles from './Tooltip.module.scss'

interface ITooltipProps {
    data: string;
}

const Tooltip = ({ data }:ITooltipProps) => {
    return (
        <div className={styles.block}>
              <button
                className={styles.tooltip}
                data-tooltip={data}
                type="button"
                aria-label={data}
              >
                <BsQuestionSquare className={styles.icon} />
              </button>
            </div>
    );
};

export default Tooltip;