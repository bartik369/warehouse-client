import React, { ChangeEvent, FC} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Field, IDevice } from "../../../types/devices";
import style from "./Number.module.scss";

interface ICustomNumberProps {
  device: IDevice;
  setDevice: (entity: number, name: string) => void;
  item: Field;
}

const CustomNumber: FC<ICustomNumberProps> = ({ device, item, setDevice }) => {
  const data = {
    min: 0,
    max: 1000,
    step: item.step,
  };

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
    <div className={style.number}>
      <div className={style.label}>{item.label}</div>
      <FontAwesomeIcon
        className={style.btn}
        onClick={handleDecrease}
        icon={faMinus}
      />
      <input
        className={style.value}
        type={item.type}
        value={Number(device[item.name as keyof IDevice] || "")}
        step={data.step}
        min={data.min}
        max={data.max}
        onChange={handleInputChange}
      />
      <FontAwesomeIcon
        className={style.btn}
        onClick={handleIncrease}
        icon={faPlus}
      />
    </div>
  );
};

export default CustomNumber;
