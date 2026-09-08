// import { useEffect } from 'react';
// import DeviceForm2 from '@/components/forms/device/DeviceForm';
import { DeviceForm } from '@/features/create-device/ui/DeviceForm';

// import { useAddDevice } from '@/hooks/data/useAddDevice';
// import { useAppDispatch } from '@/hooks/redux/useRedux';
// import { setDevicePic } from '@/store/slices/deviceSlice';

const AddDevice = () => {
  // const dispatch = useAppDispatch();
  // const { actions } = useAddDevice();

  // useEffect(() => {
  //   return () => {
  //     dispatch(setDevicePic(''));
  //   };
  // }, []);

  return (
    <>
      <DeviceForm />
      {/* <DeviceForm2 actions={actions} /> */}
    </>
  );
};

export default AddDevice;
