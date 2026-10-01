import { Empty, Flex } from 'antd';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';

import { IconButton } from '../icon-button/IconButton';
import { Spinner } from '../spinner/Spinner';
import styles from './AdminEntityList.module.scss';

type AdminEntityListItem = {
  id: string;
  name: string;
  comment?: string;
};

type AdminEntityListProps<T extends AdminEntityListItem> = {
  loading?: boolean;
  fetching?: boolean;
  items: T[];
  onEdit?: (id: T['id']) => void;
  onDelete?: (id: T['id']) => void;
};

export const AdminEntityList = <T extends AdminEntityListItem>({
  loading,
  fetching,
  items,
  onEdit,
  onDelete,
}: AdminEntityListProps<T>) => {
  const isLoading = fetching || loading;
  return (
    <div className={styles.list}>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner fontSize={40} />
        </div>
      ) : items.length === 0 ? (
        <Empty />
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.info}>
                <div className={styles.name}>{item.name}</div>
                {item.comment && <div className={styles.description}>{item.comment}</div>}
              </div>
              <Flex gap={5}>
                <IconButton icon={MdOutlineEdit} iconSize={14} onClick={() => onEdit?.(item.id)} />
                <IconButton
                  icon={MdOutlineDelete}
                  iconSize={14}
                  variant="danger"
                  onClick={() => onDelete?.(item.id)}
                />
              </Flex>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
