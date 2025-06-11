import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/redux/useRedux";
import { setDevicePic } from "../../../../store/slices/deviceSlice";
import AddDeviceForm from "../../../forms/device/DeviceForm";
import { useAddDevice } from "../../../../hooks/data/useAddDevice";
import { useModal } from "../../../../hooks/data/useModal";

const AddDevice = () => {
  const dispatch = useAppDispatch();
    const { state, actions } = useAddDevice();
    const { isOpen, setIsOpen } = useModal(false);
  
  useEffect(() => {
    return () => {
      dispatch(setDevicePic(""));
    };
  }, []);

  return (
    <section>
      <AddDeviceForm
      state={state}
      actions={actions}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      />
    </section>
  );
};

export default AddDevice;
