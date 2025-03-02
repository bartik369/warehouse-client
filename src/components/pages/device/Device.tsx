import React, {FC, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useGetDeviceQuery } from '../../../store/api/devicesApi';
import {setDeviceInfo} from '../../../store/slices/deviceSlice';
import { formatDate } from '../../../utils/date/dateUtils';
import {useAppDispatch}  from '../../../hooks/redux/useRedux';
import styles from './Device.module.scss';

const Device:FC = () => {
  const [deviceId, setDeviceId] = useState<string>('')
    const params = useParams();
    const [skip, setSkip] = useState(true);
    const {data: device} = useGetDeviceQuery(deviceId, {skip: skip});
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (params.id) {
        setDeviceId(params.id);
        setSkip(false)
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
                name: device.warehouse?.name || "",
                slug: device.warehouse?.slug || "",
              },
            },
          })
        );
      }
    }, [device]);
    return (
        <section>
        <h1 className={styles.title}>sfsdfsdfsfsds</h1>
        {device &&
        <article className={styles.wrapper}>
          <figure className={styles.picture}>
            <img src={`${import.meta.env.VITE_API_MODELS}${device.model.imagePath}`} alt="" />
          </figure>
           <div className={styles.info}> 
           <div className={styles.text}>
             Название
             <span>{device.name}</span>
           </div>
           <div className={styles.text}>
             Серийный номер
             <span>{device.serialNumber}</span>
           </div>
           <div className={styles.text}>
             Инвентарный номер
             <span>{device.inventoryNumber}</span>
            </div> 
           <div className={styles.text}>
             Размер памяти
             <span>{device.memorySize}</span>
           </div> 
           <div className={styles.text}>
             Размер экрана
             <span>{device.screenSize || '-'}</span>
           </div> 
           <div className={styles.text}>
             Производитель
             <span>{device.model.manufacturer.name}</span>
             </div> 
           <div className={styles.text}>
             Модель
             <span>{device.model.name}</span>
           </div>
           <div className={styles.text}>
             Склад
             <span>{device.warehouse.name}</span>
           </div>
           <div className={styles.text}>
             Код модели
             <span>{device.modelCode}</span>
           </div>
           <div className={styles.text}>
             Добавил(а)
             <span>{device.addedBy.firstName} {device.addedBy.lastName}</span>
           </div>
           <div className={styles.text}>
             Обновил(а)
             <span>{device.updatedBy.firstName} {device.updatedBy.lastName}</span>
           </div>
           <div className={styles.text}>
            Добавлено
             <span>{device.createdAt ? formatDate(device.createdAt) : ''}</span>
           </div>
           <div className={styles.text}>
            Обнолено
             <span>{device.updatedAt ? formatDate(device.updatedAt) : ''}</span>
           </div>
         </div>
        </article>
        }
        </section> 
    );
};

export default Device;