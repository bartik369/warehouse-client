import { useEffect } from 'react';

import { Popconfirm } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import { FiAlertTriangle } from 'react-icons/fi';

import styles from './DeleteConfirm.module.scss';

interface DeleteConfirmProps {
  title: string;
  description?: string;
  placement?: TooltipPlacement;
  children: React.ReactNode;
  onConfirm: () => void;
}

export const DeleteConfirm = ({
  title,
  description,
  placement = 'leftBottom',
  children,
  onConfirm,
}: DeleteConfirmProps) => {
  return (
    <Popconfirm
      icon={<FiAlertTriangle style={{ marginRight: 8 }} size={22} color="var(--red-500)" />}
      classNames={{
        root: styles.root,
        container: styles.container,
        title: styles.title,
        content: styles.content,
      }}
      placement={placement}
      title={title}
      description={description}
      okText="Удалить"
      cancelText="Отмена"
      okButtonProps={{
        type: 'primary',
        className: styles.okButton,
      }}
      cancelButtonProps={{
        type: 'text',
        className: styles.cancelButton,
      }}
      onConfirm={onConfirm}
    >
      {children}
    </Popconfirm>
  );
};
