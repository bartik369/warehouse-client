import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TechnicalInfo from './TechnicalInfo';
import PriceInfo from './PriceInfo';
import WarrantyInfo from './WarrantyInfo';
import UserInfo from './UserInfo';
import LocationInfo from './LocationInfo';
import Tabs from '../../tabs/Tabs';
import Modal from '../../modal/Modal';
import UpdateDeviceForm from '../../forms/device/UpdateDeviceForm';
import { useModal } from '../../../hooks/data/useModal';
import { IDevice } from '../../../types/devices';
import { useAddDevice } from '../../../hooks/data/useAddDevice';
import { useLazyGetDeviceQuery } from '../../../store/api/devicesApi';
import { setDeviceInfo } from '../../../store/slices/deviceSlice';
import { useAppDispatch } from '../../../hooks/redux/useRedux';
import { deviceTabsMenu } from '../../../utils/data/menus';
import { editDevice } from '../../../utils/constants/constants';
import { CiEdit } from "react-icons/ci";
import styles from './Device.module.scss';



const Device: FC = () => {
  const [deviceId, setDeviceId] = useState<string>('');
  const params = useParams();
  const [getDevice, { data: device2 }] = useLazyGetDeviceQuery();
  const dispatch = useAppDispatch();
  const { isOpen, setIsOpen } = useModal(false);
  const { device, selectedValues, modelFields, handleTypeChange, 
    handleGetDevice, handleInputChange, handleModelChange,
    handleManufacturerChange, handleWarehouseChange, 
    handleContractorChange, setSelectedValues } = useAddDevice();

  useEffect(() => {
    if (params.id) {
      setDeviceId(params.id);
    }
    if (deviceId) {
      getDevice(deviceId)
    }
  }, [params.id, deviceId]);

  // useEffect(() => {
  //   if (device2?.id) {
  //     dispatch(
  //       setDeviceInfo({
  //         device: {
  //           id: device2.id,
  //           isAssigned: device.isAssigned,
  //           warehouse: {
  //             name: device2.warehouse?.name || '',
  //             slug: device2.warehouse?.slug || '',
  //           },
  //           prevImg: device2.model.imagePath || '',
  //         },
  //       })
  //     );
  //   }
  // }, [device]);

  const handleActions = (id: string) => {
    handleGetDevice(id)
    setIsOpen(true)
  }

  return (
    <>
    {isOpen && (
      <Modal title={editDevice} isOpen={isOpen} setIsOpen={setIsOpen} maxWidth={1000}>
      <UpdateDeviceForm 
        device={device}
        selectedValues={selectedValues}
        modelFields={modelFields}
        setSelectedValues={setSelectedValues}
        handleInputChange={(name: keyof IDevice, e: any) => handleInputChange(name, e)}
        handleType={handleTypeChange}
        handleModel={handleModelChange}
        handleManufacturer={handleManufacturerChange}
        handleWarehouse={handleWarehouseChange}
        handleContractor={handleContractorChange}
      />
      </Modal>
    )}
    <section className={styles.section}>
      {device2 && (
        <>
        <div className={styles.header}>
          <div className={styles.name}>
          {device2.name}
          {device2.inventoryNumber && <span>{device2.inventoryNumber}</span>}
          </div>
          <div className={styles.icon} onClick={() => handleActions(device2.id || "")}>
          <CiEdit title={editDevice}/>
          </div>
        </div>
        <article className={styles.wrapper}>
          <figure className={styles.picture}>
            <img
              src={`${import.meta.env.VITE_API_MODELS}${
                device2.model.imagePath
              }`}
              alt=""
            />
          </figure>
            <div className={styles.info}>
            <TechnicalInfo device={device2} />
            </div>
            <div className={styles.info}>
            <PriceInfo device={device2} />
             <WarrantyInfo device={device2} />
          </div>
          <div className={styles.info}>
            <LocationInfo device={device2} />
            <UserInfo device={device2} />
          </div>
        </article>
        </>)}
    <Tabs tabs={deviceTabsMenu}/>
    </section>
    </>
  );
};

export default Device;
