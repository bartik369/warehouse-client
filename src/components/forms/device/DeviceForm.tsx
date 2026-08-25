import { memo, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';

import Textarea from '@/components/ui/textarea/Textarea';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/useRedux';
import { useGetManufacturersQuery } from '@/store/api/manufacturersApi';
import { useLazyGetModelsQuery } from '@/store/api/modelsApi';
import { useGetTypesQuery } from '@/store/api/typesApi';
import { useGetWarehousesQuery } from '@/store/api/warehousesApi';
import { setDevicePic } from '@/store/slices/deviceSlice';
import { RootState } from '@/store/store';
import { Contractor } from '@/types/content';
import { DeviceFormActions, Entity } from '@/types/devices';
import { LABELS } from '@/utils/constants/ui/labels';
import { SECTION_TITLES } from '@/utils/constants/ui/titles';

import Actions from './Actions';
import styles from './DeviceForm.module.scss';
import DevicePreview from './DevicePreview';
import DeviceTechnicalSection from './DeviceTechnicalSection';
import PriceForm from './PriceForm';
import WarrantyForm from './WarrantyForm';

interface DeviceFormProps {
  actions: DeviceFormActions;
}
const DeviceForm = memo(({ actions }: DeviceFormProps) => {
  const { data: manufacturers } = useGetManufacturersQuery();
  const { data: warehouses } = useGetWarehousesQuery();
  const { data: types } = useGetTypesQuery();
  const [getModels, { data: models }] = useLazyGetModelsQuery();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state.device.device);
  const errors = useAppSelector((state: RootState) => state.device.errors);
  const isUpdate = useAppSelector((state: RootState) => state.device.isUpdate);
  const checked = useAppSelector((state: RootState) => state.device.checked);

  // Allow model query by manufacturer and type
  useEffect(() => {
    if (state.model?.name && models) {
      models.forEach((model: Entity) => {
        if (model.name === state.model?.name) {
          dispatch(setDevicePic(model.imagePath || ''));
        }
      });
    }
  }, [state.model?.name, models, dispatch]);

  // Resetting the model and preview of the device when changing the manufacturer and type
  useEffect(() => {
    if (state.model?.manufacturer.slug && state.model.type.slug) {
      getModels({
        manufacturer: state.model.manufacturer.slug,
        type: state.model.type.slug,
      });
      // resetModel();
    }
  }, [state.model?.manufacturer?.slug, state.model?.type?.slug, models]);
  // Reset image state after unmount
  useEffect(() => {
    dispatch(setDevicePic(''));
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
          <div className={styles.title}>{SECTION_TITLES.financialOptions}</div>
          <PriceForm device={state} errors={errors} handleExtNumber={actions.handleExtNumber} />
          <div className={styles.title}>{SECTION_TITLES.warrantyOptions}</div>
          <WarrantyForm
            getId={(item: Contractor) => item.id}
            state={state}
            actions={actions}
            errors={errors}
            isUpdate={isUpdate}
          />
          <form className={styles.additionalForm}>
            <Textarea
              onChange={(e) => state && actions.handleInputChange('description', e.target.value)}
              value={state.description || ''}
              label={LABELS.description}
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
