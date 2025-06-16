export interface AcceptState {
    data: string;
}
export enum AcceptActionTypes {
    SET_DATA = 'SET_DATA',
}
export type AcceptAction =
| { type: AcceptActionTypes.SET_DATA, payload: string }