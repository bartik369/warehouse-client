import { useEffect, memo } from "react";
import Textarea from "../../ui/textarea/Textarea";
import DeviceTechnicalSection from "./DeviceTechnicalSection";
import Actions from "./Actions";
import PriceForm from "./PriceForm";
import WarrantyForm from "./WarrantyForm";
import DevicePreview from "./DevicePreview";
import { ToastContainer } from "react-toastify";
import { RootState } from "../../../store/store";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/useRedux";
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
  actions: DeviceFormActions;
}
const DeviceForm = memo(({ actions }: DeviceFormProps) => {
  const { data: manufacturers } = useGetManufacturersQuery();
  const { data: warehouses } = useGetWarehousesQuery();
  const { data: types } = useGetTypesQuery();
  const [getModels, { data: models }] = useLazyGetModelsQuery();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state:RootState) => state.device.device);
  const errors = useAppSelector((state:RootState) => state.device.errors);
  const isUpdate = useAppSelector((state:RootState) => state.device.isUpdate);
  const checked = useAppSelector((state:RootState) => state.device.checked);

  // Allow model query by manufacturer and type
  useEffect(() => {
    if (state.modelName && models) {
      models.forEach((model: Entity) => {
        if (model.name === state.modelName) {
          dispatch(setDevicePic(model.imagePath || ""));
        }
      });
    }
  }, [state.modelName, models, dispatch]);

  // Resetting the model and preview of the device when changing the manufacturer and type
  useEffect(() => {
    if (state.manufacturerSlug && state.typeSlug) {
      getModels({
        manufacturer: state.manufacturerSlug,
        type: state.typeSlug,
      });
      // resetModel();
    }
  }, [state.manufacturerSlug, state.typeSlug, models]);
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
            errors={errors}
            checked={checked}
            manufacturers={manufacturers || []}
            warehouses={warehouses || []}
            models={models || []}
            types={types || []}
          />
          <div className={styles.title}>{financialOptions}</div>
          <PriceForm
            device={state}
            errors={errors}
            handleExtNumber={actions.handleExtNumber}
          />
          <div className={styles.title}>{warrantyOptions}</div>
          <WarrantyForm
            getId={(item: Contractor) => item.id}
            state={state}
            actions={actions}
            errors={errors}
            isUpdate={isUpdate}
          />
          <form className={styles.additionalForm}>
            <Textarea
              onChange={(e) =>
                state && actions.handleInputChange("description", e.target.value)
              }
              value={state.description || ""}
              label={description}
              errors={errors}
              name="description"
            />
            <Actions
              resetEntity={actions.handleResetDevice}
              addEntity={actions.handleAddDevice}
              isUpdate={isUpdate}
            />
          </form>
        </div>
      </article>
    </>
  );
});
export default DeviceForm;
