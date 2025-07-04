import { AnyAction } from "redux";
import { IModalState, ModalActionsType } from "./modalTypes";

export const initialState: IModalState = {
  modalType: null,
  modalProps: {},
  isOpen: false,
};

export function modalReducer(
  state: IModalState = initialState,
  action: AnyAction
): IModalState {
  switch (action.type) {
    case ModalActionsType.OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        modalType: action.modalType,
        modalProps: action.modalProps || {},
      };
    case ModalActionsType.CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        modalType: null,
        modalProps: {},
      };
    case ModalActionsType.SET_MODAL_SIZE:
      return {
        ...state,
        modalProps: {
          ...state.modalProps,
          maxWidth: action.payload.modalSize,
          title: action.payload.title
        }
      }
    default:
      return state;
  }
}
