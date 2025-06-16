import { TransferAction, TransferState } from "./transferTypes";

export const initialTransferState: TransferState = {
    data:'',
}
export function transferReducer(
    state: TransferState,
    action:TransferAction
): TransferState {
    switch (action.type) {
        default:
            return state;
    }
}