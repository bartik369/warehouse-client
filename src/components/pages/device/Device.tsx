import { FC, useEffect } from 'react';
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
import { useAddDevice } from '../../../hooks/data/useAddDevice';
import { useLazyGetDeviceQuery } from '../../../store/api/devicesApi';
import { setDeviceInfo, setDevicePic } from '../../../store/slices/deviceSlice';
import { useAppDispatch } from '../../../hooks/redux/useRedux';
import { deviceTabsMenu } from '../../../utils/data/menus';
import { editDevice } from '../../../utils/constants/constants';
import { CiEdit } from "react-icons/ci";
import styles from './Device.module.scss';

const Device: FC = () => {
  const params = useParams();
  const [getDevice, { data: itemDevice }] = useLazyGetDeviceQuery();
  const dispatch = useAppDispatch();
  const { isOpen, setIsOpen } = useModal(false);
  const { state, actions, setters } = useAddDevice();

  useEffect(() => {
    if (params.id) getDevice(params.id);
  }, [params.id]);
  
  useEffect(() => {
    if (itemDevice?.id) {
      dispatch(
        setDeviceInfo({
          device: {
            id: itemDevice.id,
            isAssigned: state.device.isAssigned,
            warehouse: {
              name: itemDevice.warehouse?.name || '',
              slug: itemDevice.warehouse?.slug || '',
            },
          },
        })
      );
      dispatch(setDevicePic(itemDevice.model.imagePath || ''))
    }
  }, [itemDevice]);

  useEffect(() => {
    return () => { dispatch(setDevicePic('')); }
  }, []);

  const handleActions = async (id: string) => {
    await actions.handleGetDevice(id);
    setters.setIsUpdate(true);
    setIsOpen(true);
  };

  return (
    <>
      {isOpen && (
        <Modal
          title={editDevice}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          maxWidth={1000}
        >
          <UpdateDeviceForm state={state} actions={actions} setters={setters} />
        </Modal>
      )}
      <section className={styles.section}>
        {itemDevice && (
          <>
            <div className={styles.header}>
              <div className={styles.name}>
                {itemDevice.name}
                {itemDevice.inventoryNumber && (
                  <span>{itemDevice.inventoryNumber}</span>
                )}
              </div>
              <div
                className={styles.icon}
                onClick={() => handleActions(itemDevice.id || "")}
              >
                <CiEdit title={editDevice} />
              </div>
            </div>
            <article className={styles.wrapper}>
              <figure className={styles.picture}>
                <img
                  src={`${import.meta.env.VITE_API_MODELS}${
                    itemDevice.model.imagePath
                  }`}
                  alt=""
                />
              </figure>
              <div className={styles.info}>
                <TechnicalInfo device={itemDevice} />
              </div>
              <div className={styles.info}>
                <PriceInfo device={itemDevice} />
                <WarrantyInfo device={itemDevice} />
              </div>
              <div className={styles.info}>
                <LocationInfo device={itemDevice} />
                <UserInfo device={itemDevice} />
              </div>
            </article>
          </>
        )}
        <Tabs tabs={deviceTabsMenu} />
      </section>
    </>
  );
};

export default Device;
