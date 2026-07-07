import { Switch, Typography } from 'antd';

import styles from './SwitchField.module.scss';
import { SwitchFieldProps } from './types';

export const SwitchField = ({ checked, onChange }: SwitchFieldProps) => {
  return (
    <div className={styles.status}>
      <div className={styles.switch}>
        <Switch checked={checked} onChange={onChange} />
      </div>
      <Typography.Text className={checked ? styles.activeText : styles.inactiveText}>
        {checked ? 'Аккаунт активен' : 'Аккаунт неактивен'}
      </Typography.Text>
    </div>
  );
};
