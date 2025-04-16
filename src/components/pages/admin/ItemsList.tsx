import { FC } from "react";
import { IEntity } from "../../../types/devices";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin4Line } from "react-icons/ri";
import styles from "./Admin.module.scss";

interface IItemsListProps {
  field: string;
  items: IEntity[];
  onEdit: (id: string, field: string) => void;
  onDelete?: (id: string, field: string) => void;
}
const ItemsList: FC<IItemsListProps> = ({ field, items, onEdit, onDelete }) => {
  if (items.length === 0) return <div>net info</div>;
  return (
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
            <button className={styles.btn} onClick={() => onEdit(item.id, field)}>
              <MdOutlineEdit />
            </button>
            {onDelete &&
            <button className={styles.btn} onClick={() => onDelete(item.id, field)}>
              <RiDeleteBin4Line />
            </button>
            }
          </div>
        </li>
      ))}
    </ul>
  ); 
};

export default ItemsList;
