import { Empty } from 'antd';
import { MdOutlineEdit } from 'react-icons/md';

import styles from './AdminEntityList.module.scss';

type AdminEntityListItem = {
  id: string;
  name: string;
  comment?: string;
};

type AdminEntityListProps<T extends AdminEntityListItem> = {
  items: T[];
  onEdit: (id: T['id']) => void;
  onDelete?: (id: T['id']) => void;
};

export const AdminEntityList = <T extends AdminEntityListItem>({
  items,
  onEdit,
  onDelete,
}: AdminEntityListProps<T>) => {
  if (items.length === 0) return <Empty />;
  return (
    <div className={styles.list}>
      <ul>
        {items.map((item: AdminEntityListItem) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.info}>
              <div className={styles.name}>{item.name}</div>
              {item.comment && <div className={styles.description}>{item.comment}</div>}
            </div>
            <div className={styles.actions}>
              <button className={styles.btn} onClick={() => onEdit?.(item.id)}>
                <MdOutlineEdit />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
