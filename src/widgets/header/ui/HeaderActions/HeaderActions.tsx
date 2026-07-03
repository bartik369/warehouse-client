import { CheckOutlined, InfoCircleOutlined, LoginOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';

import BtnAction from '@/components/ui/buttons/BtnAction';

import { useHeaderActions } from '../../model/useHeaderActions';
import styles from './HeaderActions.module.scss';

interface HeaderActionsProps {
  isDevicePage: boolean;
  hasSelection: boolean;
  isAssigned?: boolean;
}

export const HeaderActions = ({ isDevicePage, hasSelection, isAssigned }: HeaderActionsProps) => {
  const { handleProcessRoute } = useHeaderActions();

  const actions =
    !isAssigned && hasSelection
      ? [
          {
            key: 'issue',
            label: 'Выдать',
            icon: <LoginOutlined />,
          },
          {
            key: 'move',
            label: 'Переместить',
            icon: <SwapOutlined />,
          },
        ]
      : [
          {
            key: 'accept',
            label: 'Принять',
            icon: <CheckOutlined />,
          },
        ];
  return (
    <div className={styles.headerActions}>
      {actions.map((action) => (
        <Button
          className={styles.button}
          key={action.key}
          icon={action.icon}
          onClick={() => handleProcessRoute(action.key)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};
