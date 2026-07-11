import { Empty, Spin } from 'antd';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';

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
        <Spin />
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
              <div className={styles.actions}>
                <button type="button" className={styles.btn} onClick={() => onEdit?.(item.id)}>
                  <MdOutlineEdit />
                </button>
                <button type="button" className={styles.btn} onClick={() => onDelete?.(item.id)}>
                  <MdOutlineDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
