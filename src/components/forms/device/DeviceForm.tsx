import { useEffect, memo } from "react";
import Textarea from "../../ui/textarea/Textarea";
import DeviceTechnicalSection from "./DeviceTechnicalSection";
import Actions from "./Actions";
import PriceForm from "./PriceForm";
import WarrantyForm from "./WarrantyForm";
import DevicePreview from "./DevicePreview";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "../../../hooks/redux/useRedux";
import { DeviceState } from "../../../reducers/device/deviceTypes";
import { setDevicePic } from "../../../store/slices/deviceSlice";
import { useGetWarehousesQuery } from "../../../store/api/warehousesApi";
import { useLazyGetModelsQuery } from "../../../store/api/modelsApi";
import { useGetTypesQuery } from "../../../store/api/typesApi";
import { useGetManufacturersQuery } from "../../../store/api/manufacturersApi";
import { Entity, DeviceFormActions } from "../../../types/devices";
import { Contractor } from "../../../types/content";
import { financialOptions, warrantyOptions } from "../../../utils/constants/constants";
import { description } from "../../../utils/constants/device";
import styles from "./DeviceForm.module.scss";

interface DeviceFormProps {
  state: DeviceState;
  actions: DeviceFormActions;
}

const DeviceForm = memo(({state, actions }: DeviceFormProps) => {
  const { data: manufacturers } = useGetManufacturersQuery();
  const { data: warehouses } = useGetWarehousesQuery();
  const { data: types } = useGetTypesQuery();
  const [getModels, { data: models }] = useLazyGetModelsQuery();
  const dispatch = useAppDispatch();

  // Allow model query by manufacturer and type
  useEffect(() => {
    if (state.device.modelName && models) {
      models.forEach((model: Entity) => {
        if (model.name === state.device.modelName) {
          dispatch(setDevicePic(model.imagePath || ""));
        }
      });
    }
  }, [state.device.modelName, models, dispatch]);

  // Resetting the model and preview of the device when changing the manufacturer and type
  useEffect(() => {
    if (state.device.manufacturerSlug && state.device.typeSlug) {
      getModels({
        manufacturer: state.device.manufacturerSlug,
        type: state.device.typeSlug,
      });
      // resetModel();
    }
  }, [state.device.manufacturerSlug, state.device.typeSlug, models]);
  // Reset image state after unmount
  useEffect(() => {
    dispatch(setDevicePic(""));
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-center" theme="light" />
      <article className={styles.wrapper}>
        <DevicePreview />
        <div className={styles.forms}>
          <DeviceTechnicalSection
            state={state}
            actions={actions}
            manufacturers={manufacturers || []}
            warehouses={warehouses || []}
            models={models || []}
            types={types || []}
          />
          <div className={styles.title}>{financialOptions}</div>
          <PriceForm
            device={state.device}
            errors={state.errors}
            handleExtNumber={actions.handleExtNumber}
          />
          <div className={styles.title}>{warrantyOptions}</div>
          <WarrantyForm
            getId={(item: Contractor) => item.id}
            state={state}
            actions={actions}
          />
          <form className={styles.additionalForm}>
            <Textarea
              onChange={(e) =>
                actions.handleInputChange("description", e.target.value)
              }
              value={state.device.description || ""}
              label={description}
              errors={state.errors}
              name="description"
            />
            <Actions
              resetEntity={actions.handleResetDevice}
              addEntity={actions.handleAddDevice}
              isUpdate={state.isUpdate}
            />
          </form>
        </div>
      </article>
    </>
  );
});
export default DeviceForm;
