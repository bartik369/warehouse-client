import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ModalActionsType, ModalType } from "../../reducers/modal/modalTypes";

export function useGlobalModal() {
  const dispatch = useDispatch();
  const { isOpen, modalType, modalProps } = useSelector(
    (state: RootState) => state.modal
  );

  const openModal = (modalType: ModalType, modalProps: Record<string, any>) => {
    dispatch({
      type: ModalActionsType.OPEN_MODAL,
      modalType,
      modalProps,
    });
  };

  const closeModal = () => {
    dispatch({ type: ModalActionsType.CLOSE_MODAL });
  };

  return {
    isOpen,
    modalType,
    modalProps,
    openModal,
    closeModal,
    dispatch,
  };
}
