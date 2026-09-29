import { Button } from 'antd';
import { RiResetLeftFill } from 'react-icons/ri';

import styles from './ResetButton.module.scss';

interface ResetButtonProps {
  iconSize?: number;
  disabled?: boolean;
  onClick: () => void;
}

export const ResetButton = ({ iconSize = 17, disabled, onClick }: ResetButtonProps) => {
  return (
    <Button className={styles.button} disabled={disabled} onClick={onClick}>
      <RiResetLeftFill size={iconSize} />
    </Button>
  );
};
