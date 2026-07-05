import { useEffect } from 'react';

import DeviceForm from '@/components/forms/device/DeviceForm';
import { useAddDevice } from '@/hooks/data/useAddDevice';
import { useAppDispatch } from '@/hooks/redux/useRedux';
import { setDevicePic } from '@/store/slices/deviceSlice';

const AddDevice = () => {
  const dispatch = useAppDispatch();
  const { actions } = useAddDevice();

  useEffect(() => {
    return () => {
      dispatch(setDevicePic(''));
    };
  }, []);

  return (
    <section>
      <DeviceForm actions={actions} />
    </section>
  );
};

export default AddDevice;
