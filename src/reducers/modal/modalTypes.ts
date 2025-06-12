export type ModalType = 
  "entity" | "contractor" | "issue" | "receive" | "type" | "manufacturer" | "model" | null;

export interface IModalState {
  modalType: ModalType;
  modalProps: Record<string, any>;
  isOpen: boolean;
}

export enum ModalActionsType {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
}

export type ModalActions = 
  | { type: ModalActionsType.OPEN_MODAL; modalType: ModalType; modalProps?: Record<string, any> }
  | { type: ModalActionsType.CLOSE_MODAL };
