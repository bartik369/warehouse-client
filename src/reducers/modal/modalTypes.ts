export type ModalType = 
  "entity" 
  | "contractor" 
  | "signature-document" 
  | "signature" 
  | "receive" 
  | "type" 
  | "manufacturer" 
  | "model" 
  
  | null;

export interface IModalState {
  modalType: ModalType;
  modalProps: Record<string, any>;
  isOpen: boolean;
}

export enum ModalActionsType {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  SET_MODAL_SIZE = 'SET_MODAL_SIZE',
}

export type ModalActions = 
  | { type: ModalActionsType.OPEN_MODAL; modalType: ModalType; modalProps?: Record<string, any> }
  | { type: ModalActionsType.CLOSE_MODAL }
  | { type: ModalActionsType.SET_MODAL_SIZE, payload: number }
