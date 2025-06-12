import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TechnicalInfo from "./TechnicalInfo";
import PriceInfo from "./PriceInfo";
import WarrantyInfo from "./WarrantyInfo";
import UserInfo from "./UserInfo";
import LocationInfo from "./LocationInfo";
import Tabs from "../../tabs/Tabs";
import Modal from "../../modal/Modal";
import DeviceForm from "../../forms/device/DeviceForm";
import { useModal } from "../../../hooks/data/useModal";
import { useAddDevice } from "../../../hooks/data/useAddDevice";
import { useLazyGetDeviceQuery } from "../../../store/api/devicesApi";
import { setDeviceInfo, setDevicePic } from "../../../store/slices/deviceSlice";
import { useAppDispatch } from "../../../hooks/redux/useRedux";
import { deviceTabsMenu } from "../../../utils/data/menus";
import { editDevice } from "../../../utils/constants/constants";
import { CiEdit } from "react-icons/ci";
import styles from "./Device.module.scss";

const Device = () => {
  const params = useParams();
  const [getDevice, { data: itemDevice }] = useLazyGetDeviceQuery();
  const dispatchDeviceInfo = useAppDispatch();
  const { isOpen, setIsOpen } = useModal(false);
  const { state, actions } = useAddDevice();

  useEffect(() => {
    if (params.id) getDevice(params.id);
  }, [params.id]);

  useEffect(() => {
    if (itemDevice?.id) {
      dispatchDeviceInfo(
        setDeviceInfo({
          device: {
            id: itemDevice.id,
            isAssigned: state.device.isAssigned,
            warehouse: {
              name: itemDevice.warehouse?.name || "",
              slug: itemDevice.warehouse?.slug || "",
            },
          },
        })
      );
      dispatchDeviceInfo(setDevicePic(itemDevice.model.imagePath || ""));
    }
    return () => {
      dispatchDeviceInfo(setDevicePic(""));
    };
  }, [itemDevice]);

  return (
    <>
      {isOpen && (
        <Modal
          title={state.fieldType}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          maxWidth={1000}
        >
          <DeviceForm 
            state={state} 
            actions={actions} 
          />
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
                onClick={() => {
                  actions.handleGetDevice(itemDevice.id)
                  setIsOpen(true)
                }}
              >
                <CiEdit title={editDevice} />
              </div>
            </div>
            <article className={styles.wrapper}>
              <figure className={styles.picture}>
                <img src={`/api/models/${itemDevice.model.imagePath}`} alt="" />
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
