import React, { ChangeEvent, memo } from 'react';
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { Field, IDevice, IValidationErrors } from '../../../types/devices';
import style from './Number.module.scss';

interface ICustomNumberProps {
  device: IDevice;
  setDevice: (entity: number, name: string) => void;
  item: Field;
  errors: IValidationErrors;
}

const CustomNumber = memo(({ device, item, errors, setDevice }:ICustomNumberProps) => {
  const data = {
    min: 0,
    max: 9999999,
    step: item.step,
  };

  const errorMessage = errors[item.name as keyof IValidationErrors];
  
  const handleValueChange = (value: number, name: string) => {
    const parsedValue = parseFloat(value.toFixed(2));
    
    if (!isNaN(parsedValue)) {
      const value = Math.min(Math.max(parsedValue, data.min), data.max);
      setDevice(value, name);
    }
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentValue = device[item.name as keyof IDevice] || 0;
    const value = typeof currentValue === "number" ? currentValue : 0;
    handleValueChange(value + data.step, item.name);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentValue = device[item.name as keyof IDevice] || 0;
    const value = typeof currentValue === "number" ? currentValue : 0;
    handleValueChange(value - data.step, item.name);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || data.min;
    handleValueChange(value, item.name);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.number}>
        <div className={style.label}>{item.label}</div>
        <CiSquareMinus
          className={style["btn-left"]}
          onClick={handleDecrease}
        />
        <input
          className={style.value}
          type={item.type}
          value={Number(device[item.name as keyof IDevice] || 0)}
          step={data.step}
          min={data.min}
          max={data.max}
          onChange={handleInputChange}
        />
        <CiSquarePlus
          className={style["btn-right"]}
          onClick={handleIncrease}
        />
      </div>
      <div className={style.error}>
        {errorMessage && errorMessage }
      </div>
    </div>
  );
});

export default CustomNumber;
