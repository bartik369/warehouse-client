import { FC, useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/redux/useRedux";
import { setDevicePic } from "../../../../store/slices/deviceSlice";
import AddDeviceForm from "../../../forms/device/DeviceForm";

const AddDevice: FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    return () => {
      dispatch(setDevicePic(""));
    };
  }, []);

  return (
    <div>
      <AddDeviceForm />
    </div>
  );
};

export default AddDevice;
