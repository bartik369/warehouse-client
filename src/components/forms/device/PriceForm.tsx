import { FC } from 'react';
import { devicePrices } from '../../../utils/constants/device';
import CustomNumber from '../../ui/number/CustomNumber';
import { IDevice } from '../../../types/devices';
import styles from './DeviceForm.module.scss'

interface IPriceFormProps {
  device: IDevice;
  handleExtNumber: (entity: number, name: string) => void;
  errors: Record<string, string>;
}

const PriceForm:FC<IPriceFormProps> = ({ device, errors, handleExtNumber }) => {
    return (
        <form className={styles.form}>
            {devicePrices?.uniqueFields?.map((item) => (
                <CustomNumber
                  key={item.name}
                  device={device}
                  setDevice={handleExtNumber}
                  item={item}
                  errors={errors}
                />
              ))}
            
        </form>
    );
};

export default PriceForm;