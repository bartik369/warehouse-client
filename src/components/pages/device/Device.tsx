import { FC, useEffect, useState } from 'react';
import TechnicalInfo from './TechnicalInfo';
import PriceInfo from './PriceInfo';
import WarrantyInfo from './WarrantyInfo';
import UserInfo from './UserInfo';
import Tabs from '../../tabs/Tabs';
import { useParams } from 'react-router-dom';
import { useGetDeviceQuery } from '../../../store/api/devicesApi';
import { setDeviceInfo } from '../../../store/slices/deviceSlice';
import { useAppDispatch } from '../../../hooks/redux/useRedux';
import { deviceTabsMenu } from '../../../utils/data/menus';
import styles from './Device.module.scss';

const Device: FC = () => {
  const [deviceId, setDeviceId] = useState<string>('');
  const params = useParams();
  const [skip, setSkip] = useState(true);
  const { data: device } = useGetDeviceQuery(deviceId, { skip: skip });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.id) {
      setDeviceId(params.id);
      setSkip(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (device?.id) {
      dispatch(
        setDeviceInfo({
          device: {
            id: device.id,
            isAssigned: device.isAssigned,
            warehouse: {
              name: device.warehouse?.name || '',
              slug: device.warehouse?.slug || '',
            },
          },
        })
      );
    }
  }, [device]);
  return (
    <section>
      {device && (
        <article className={styles.wrapper}>
          <figure className={styles.picture}>
            <img
              src={`${import.meta.env.VITE_API_MODELS}${
                device.model.imagePath
              }`}
              alt=""
            />
          </figure>
            <TechnicalInfo device={device} />
            <div className={styles.info}>
            <PriceInfo device={device} />
            <WarrantyInfo device={device} />
            <UserInfo device={device} />
          </div>
        </article>
      )}
    <Tabs tabs={deviceTabsMenu}/>
    </section>
  );
};

export default Device;
