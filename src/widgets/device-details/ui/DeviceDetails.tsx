import { Alert, Card, Empty, Flex } from 'antd';
import { useParams } from 'react-router-dom';

import { PATHS } from '@/shared/api/paths';
import { Spinner } from '@/shared/ui/spinner/Spinner';
import { useGetDeviceQuery } from '@/store/api/devicesApi';

import styles from './DeviceDetails.module.scss';
import { DeviceStatusLocation } from './DeviceStatusLocation';
import { FinancialInfo } from './FinancialInfo';
import { TechnicalInfo } from './TechnicalInfo';
import { WarrantyInfo } from './WarrantyInfo';
import { DeviceGeneralInfo } from './general-info/DeviceGeneralInfo';

export const DeviceDetails = () => {
  const { id } = useParams();
  if (!id) return null;

  return <DeviceDetailsContent id={id} />;
};

const DeviceDetailsContent = ({ id }: { id: string }) => {
  const { data: device, isLoading, isError } = useGetDeviceQuery(id);

  if (isLoading) return <Spinner />;

  if (isError) {
    return <Alert type="error" message="Не удалось загрузить устройство" />;
  }
  if (!device) return <Empty />;

  return (
    <Flex vertical gap={20}>
      <DeviceGeneralInfo device={device} />
      <div className={styles.content}>
        <Card>
          <img src={`${PATHS.models}${device.model?.imagePath}`} alt="" />
        </Card>
        <TechnicalInfo device={device} />
        <DeviceStatusLocation device={device} />
        <FinancialInfo device={device} />
        <WarrantyInfo device={device} />
      </div>
    </Flex>
  );
};

// import { useEffect } from 'react';

// import { CiEdit } from 'react-icons/ci';
// import { useParams } from 'react-router-dom';

// import DeviceForm from '@/components/forms/device/DeviceForm';
// import Modal from '@/components/modal/Modal';
// import Tabs from '@/components/tabs/Tabs';
// import { useAddDevice } from '@/hooks/data/useAddDevice';
// import { useModal } from '@/hooks/data/useModal';
// import { useAppDispatch, useAppSelector } from '@/hooks/redux/useRedux';
// import { useLazyGetDeviceQuery } from '@/store/api/devicesApi';
// import { patchDevice, resetDevice, resetStatus, setDevicePic } from '@/store/slices/deviceSlice';
// import { RootState } from '@/store/store';
// import { PATHS } from '@/utils/constants/system/paths';
// import { SECTION_TITLES } from '@/utils/constants/ui/titles';
// import { deviceTabsMenu } from '@/utils/data/menus';
// import { handleApiError } from '@/utils/errors/handleApiError';

// import styles from './Device.module.scss';
// import LocationInfo from './LocationInfo';
// import PriceInfo from './PriceInfo';
// import TechnicalInfo from './TechnicalInfo';
// import UserInfo from './UserInfo';
// import WarrantyInfo from './WarrantyInfo';

// const Device = () => {
//   const params = useParams();
//   const [getDevice, { data: itemDevice }] = useLazyGetDeviceQuery();
//   const { isOpen, setIsOpen } = useModal(false);
//   const { actions } = useAddDevice();
//   const currentFieldType = useAppSelector((state: RootState) => state.device.fieldType);
//   const dispatch = useAppDispatch();

//   async function fetchDevice(id: string) {
//     try {
//       const itemDevice = await getDevice(id).unwrap();
//       // dispatch(
//       //   patchDevice({
//       //     id: itemDevice.id,
//       //     name: itemDevice.name,
//       //     isAssigned: itemDevice.isAssigned,
//       //     warehouseName: itemDevice.warehouse.name || '',
//       //     warehouseSlug: itemDevice.warehouse?.slug || '',
//       //   })
//       // );
//       console.log(itemDevice);
//       dispatch(setDevicePic(itemDevice.model.imagePath || ''));
//     } catch (err: unknown) {
//       handleApiError(err);
//     }
//   }

//   useEffect(() => {
//     if (params.id) fetchDevice(params.id);
//   }, [params.id]);

//   useEffect(() => {
//     return () => {
//       dispatch(resetDevice());
//       dispatch(resetStatus());
//     };
//   }, []);

//   return (
//     <>
//       {isOpen && (
//         <Modal title={currentFieldType} isOpen={isOpen} setIsOpen={setIsOpen} maxWidth={1000}>
//           <DeviceForm actions={actions} />
//         </Modal>
//       )}
//       <section className={styles.section}>
//         {itemDevice && (
//           <>
//             <div className={styles.header}>
//               <div className={styles.name}>
//                 {itemDevice.name}
//                 {itemDevice.inventoryNumber && <span>{itemDevice.inventoryNumber}</span>}
//               </div>
//               <div
//                 className={styles.icon}
//                 onClick={() => {
//                   actions.handleGetDevice(itemDevice.id);
//                   setIsOpen(true);
//                 }}
//               >
//                 <CiEdit title={SECTION_TITLES.editDevice} />
//               </div>
//             </div>
//             <article className={styles.wrapper}>
//               <figure className={styles.picture}>
//                 <img src={`${PATHS.models}${itemDevice.model.imagePath}`} alt="" />
//               </figure>
//               <div className={styles.info}>
//                 <TechnicalInfo device={itemDevice} />
//               </div>
//               <div className={styles.info}>
//                 <PriceInfo device={itemDevice} />
//                 <WarrantyInfo device={itemDevice} />
//               </div>
//               <div className={styles.info}>
//                 <LocationInfo device={itemDevice} />
//                 <UserInfo device={itemDevice} />
//               </div>
//             </article>
//           </>
//         )}
//         <Tabs tabs={deviceTabsMenu} />
//       </section>
//     </>
//   );
// };

// export default Device;
