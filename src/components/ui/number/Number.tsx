import React, { ChangeEvent, memo, useEffect, useState} from 'react';
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { Device } from '@/types/devices';
import { LABELS } from '@/utils/constants/ui/labels';
import style from './Number.module.scss';

interface NumberProps {
    device: Device;
    setDevice: (entity:number) => void;
}
const Number = memo(({ device, setDevice }:NumberProps) => {
    const [inputValue, setInputValue] = useState<string>('');
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
        const currentValue = parseFloat(inputValue) || 0
         handleValueChange(currentValue - data.step);
      };
    
    const handleDecrease = (e:React.MouseEvent) => {
        e.preventDefault();
        handleValueChange(device.weight! + data.step);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleValueChange(parseFloat(e.target.value) || data.min);
    };

    useEffect(() => {
        const currentValue = device.weight;
        setInputValue(currentValue?.toString() ?? '');
    }, [device.weight]);
    
    return (
        <div className={style.wrapper}>
            <div className={style.error}>
            </div>
            <div className={style.number}>
                <div className={style.label}>
                {LABELS.deviceWeight}
                </div>
                <CiSquareMinus className={style["btn-left"]} onClick={handleIncrease} />
                <input 
                    className={style.value} 
                    type="number"
                    inputMode="decimal"
                    value={inputValue}
                    step={data.step}
                    min={data.min}
                    max={data.max}
                    onChange={handleInputChange}
                />
                <CiSquarePlus className={style["btn-right"]} onClick={handleDecrease} />
            </div>
        </div>
    );
});

export default Number;