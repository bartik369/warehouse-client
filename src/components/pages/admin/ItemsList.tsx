import { IEntity } from '../../../types/devices';
import { IEntityFormActions } from '../../../types/entity';
import { MdOutlineEdit } from 'react-icons/md';
import styles from './Admin.module.scss';

interface IItemsListProps {
  actions: IEntityFormActions;
  field: string;
  items: IEntity[];
}
const ItemsList = ({ field, items, actions }: IItemsListProps) => {
  if (items.length === 0) return <div>net info</div>;
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
};

export default ItemsList;
