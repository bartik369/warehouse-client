import { FC } from 'react';
import { IEntity } from '../../../types/devices';
import { BsPencilSquare } from 'react-icons/bs';
import styles from './Admin.module.scss';

interface IItemsListProps {
    field: string;
    items: IEntity[]
    handle: (id: string, field: string) => void;
}
const ItemsList: FC<IItemsListProps> = ({field, items, handle}) => {
    if (items.length === 0) return <div>net info</div>
    return (
        <ul>
            {items.map((item) =>
                <li key={item.id} className={styles.item}>
                    <span className={styles.name}>{item.name}</span>
                    <button 
                        className={styles.btn}
                        onClick={() => handle(item.id, field)}
                    >
                        <BsPencilSquare />
                    </button>
                </li>
            )}
        </ul>
    );
};

export default ItemsList;