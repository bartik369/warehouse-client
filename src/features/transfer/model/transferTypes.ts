export interface TransferState {
    data: string;
}
export enum TransferActionTypes {
    SET_DATA = 'SET_DATA',
}
export type TransferAction =
| { type: TransferActionTypes.SET_DATA, payload: string }