import { memo } from 'react';
import { Entity } from '@/types/devices';
import { EntityFormActions } from '@/types/entity';
import { MdOutlineEdit } from 'react-icons/md';
import NoData from '@/components/nodata/NoData';
import styles from './Admin.module.scss';

interface ItemsListProps {
  actions: EntityFormActions;
  field: string;
  items: Entity[];
}
const ItemsList = memo(({ field, items, actions }: ItemsListProps) => {
  if (items.length === 0) return <NoData />;
  return (
    <>
    <ul>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <div className={styles.info}>
            <div className={styles.name}>{item.name}</div>
            {item.comment && (
              <div className={styles.description}>{item.comment}</div>
            )}
          </div>
          <div className={styles.actions}>
            <button
              className={styles.btn}
              onClick={() => actions.handleGetEntity?.(item.id, field)}
            >
              <MdOutlineEdit />
            </button>
          </div>
        </li>
      ))}
    </ul>
    </>
  );
});

export default ItemsList;
