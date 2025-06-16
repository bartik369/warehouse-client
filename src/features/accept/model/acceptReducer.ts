import { AcceptAction, AcceptState } from "./acceptTypes";

export const initialAcceptState: AcceptState = {
    data:'',
}
export function acceptReducer(
    state: AcceptState,
    action: AcceptAction
): AcceptState {
    switch (action.type) {
        default:
            return state;
    }
}