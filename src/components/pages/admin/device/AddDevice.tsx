import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/redux/useRedux";
import { setDevicePic } from "../../../../store/slices/deviceSlice";
import AddDeviceForm from "../../../forms/device/DeviceForm";
import { useAddDevice } from "../../../../hooks/data/useAddDevice";

const AddDevice = () => {
  const dispatch = useAppDispatch();
  const { state, actions } = useAddDevice();

  useEffect(() => {
    return () => {
      dispatch(setDevicePic(""));
    };
  }, []);

  return (
    <section>
      <AddDeviceForm state={state} actions={actions} />
    </section>
  );
};

export default AddDevice;
