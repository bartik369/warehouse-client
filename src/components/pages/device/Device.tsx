import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TechnicalInfo from "./TechnicalInfo";
import PriceInfo from "./PriceInfo";
import WarrantyInfo from "./WarrantyInfo";
import UserInfo from "./UserInfo";
import LocationInfo from "./LocationInfo";
import Tabs from "@/components/tabs/Tabs";
import Modal from "@/components/modal/Modal";
import DeviceForm from "@/components/forms/device/DeviceForm";
import { handleApiError } from "@/utils/errors/handleApiError";
import { useModal } from "@/hooks/data/useModal";
import { useAddDevice } from "@/hooks/data/useAddDevice";
import { useAppSelector, useAppDispatch } from "@/hooks/redux/useRedux";
import { RootState } from "@/store/store";
import { useLazyGetDeviceQuery } from "@/store/api/devicesApi";
import { patchDevice, resetDevice, resetStatus, setDevicePic } from "@/store/slices/deviceSlice";
import { deviceTabsMenu } from "@/utils/data/menus";
import { SECTION_TITLES } from "@/utils/constants/ui/titles";
import { CiEdit } from "react-icons/ci";
import styles from "./Device.module.scss";

const Device = () => {
  const params = useParams();
  const [getDevice, { data: itemDevice }] = useLazyGetDeviceQuery();
  const { isOpen, setIsOpen } = useModal(false);
  const { actions } = useAddDevice();
  const currentFieldType = useAppSelector((state:RootState) => state.device.fieldType);
  const dispatch = useAppDispatch();

  async function fetchDevice(id: string) {
    try {
      const itemDevice = await getDevice(id).unwrap();
      dispatch(patchDevice({
        id: itemDevice.id,
        name: itemDevice.name,
        isAssigned: itemDevice.isAssigned,
        warehouseName: itemDevice.warehouse?.name || "",
        warehouseSlug: itemDevice.warehouse?.slug || "",
      }))
      dispatch(setDevicePic(itemDevice.model.imagePath || ""))
     
    } catch (err: unknown) {
       handleApiError(err);
    }
  }

  useEffect(() => {
    if (params.id) fetchDevice(params.id);
  }, [params.id]);

  useEffect(() => {
    return () => {
      dispatch(resetDevice());
      dispatch(resetStatus());
    }
  }, []);

  return (
    <>
      {isOpen && (
        <Modal
          title={currentFieldType}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          maxWidth={1000}
        >
          <DeviceForm actions={actions} />
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
                <CiEdit title={SECTION_TITLES.editDevice} />
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
