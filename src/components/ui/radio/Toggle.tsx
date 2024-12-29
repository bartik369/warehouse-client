import {FC} from 'react';
import style from './Toggle.module.scss'

interface IToggleProps {
    checked: boolean;
    leftPosition: string;
    rightPosition: string;
    setChecked: () => void;
}
const Toggle: FC<IToggleProps> = (
    {checked, leftPosition, rightPosition, setChecked}
    ) => {
    return (
        <div className={style.switch}>
            <input
                type="checkbox"
                id="checkbox"
                checked={checked}
                onChange={setChecked}
            />
            <label className={style.slider} htmlFor="checkbox">
                <div className={style.labels}>
                    <span className={style.yes}>{rightPosition}</span>
                    <span className={style.no}>{leftPosition}</span>
                </div>
            </label>
        </div> 
    );
};

export default Toggle;