import { FC } from 'react';
import { ILocation } from '../../../types/locations';
import styles from "./Admin.module.scss";
import { BsPencilSquare } from 'react-icons/bs';

interface IItemsListProps {
    items: ILocation[];
    handle: () => void;
}
const ItemsList:FC<IItemsListProps> = ({items, handle}) => {
    if (!items) return <div>net info</div>
    return (
        <ul>
            {items.map((item) =>
                <li key={item.id} className={styles.item}>
                    <span className={styles.name}>{item.name}</span>
                    <button 
                        className={styles.btn}
                        onClick={handle}
                    >
                        <BsPencilSquare />
                    </button>
                </li>
            )}
        </ul>
    );
};

export default ItemsList;