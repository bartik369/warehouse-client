import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/redux/useRedux";
import { setDevicePic } from "../../../../store/slices/deviceSlice";
import AddDeviceForm from "../../../forms/device/DeviceForm";

const AddDevice = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    return () => {
      dispatch(setDevicePic(""));
    };
  }, []);

  return (
    <section>
      <AddDeviceForm />
    </section>
  );
};

export default AddDevice;
