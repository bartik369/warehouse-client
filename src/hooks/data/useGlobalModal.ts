import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ModalActionsType, ModalType } from "../../reducers/modal/modalTypes";
import { modalSize } from "../../utils/modal/modalSize";

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
  const updateModalProps = (step: string) => {
    dispatch({
      type: ModalActionsType.SET_MODAL_SIZE,
      payload: modalSize(step)
    })
  }

  const closeModal = () => {
    dispatch({ type: ModalActionsType.CLOSE_MODAL });
  };

  return {
    isOpen,
    modalType,
    modalProps,
    openModal,
    closeModal,
    updateModalProps,
    dispatch,
  };
}
