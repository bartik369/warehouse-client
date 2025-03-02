import { devicePrices } from '../../../utils/constants/device';
import CustomNumber from '../../ui/number/CustomNumber';
import { useAddDevice } from '../../../hooks/data/useAddDevice';
import styles from './DeviceForm.module.scss'

const PriceForm = () => {
    const {device, handleExtNumber, errors} =  useAddDevice();
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