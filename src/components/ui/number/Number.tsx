import React, {ChangeEvent, FC, memo} from 'react';
import { deviceWeight} from '../../../utils/constants/device';
import { IDevice } from '../../../types/devices';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import style from './Number.module.scss';

interface INumberProps {
    device: IDevice;
    setDevice: (entity:number) => void;
}
const Number:FC<INumberProps> = memo(({ device, setDevice}) => {
    const data = {
        min: 0,
        max: 1000000,
        step:0.1
    };
    
    const handleValueChange = (newValue:number) => {
        const parsedValue = parseFloat(newValue.toFixed(2));
        if (!isNaN(parsedValue)) {
          const value = Math.min(Math.max(parsedValue, data.min), data.max);
          setDevice(value);
        }
      };

    const handleIncrease = (e: React.MouseEvent) => {
        e.preventDefault();
         handleValueChange(device.weight! - data.step);
      };
    
    const handleDecrease = (e:React.MouseEvent) => {
        e.preventDefault();
        handleValueChange(device.weight! + data.step);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleValueChange(parseFloat(e.target.value) || data.min);
    };
    
    return (
        <div className={style.wrapper}>
            <div className={style.error}>
            </div>
            <div className={style.number}>
                <div className={style.label}>
                {deviceWeight}
                </div>
                <FontAwesomeIcon className={style['btn-left']} onClick={handleIncrease} icon={faMinus}/>
                <input 
                    className={style.value} 
                    type="number"
                    value={device.weight}
                    step={data.step}
                    min={data.min}
                    max={data.max}
                    onChange={handleInputChange}
                />
                <FontAwesomeIcon className={style['btn-right']} onClick={handleDecrease} icon={faPlus} />
            </div>
        </div>
    );
});

export default Number;