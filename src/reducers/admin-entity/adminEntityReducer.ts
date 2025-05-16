import { useInputMask } from '../../hooks/data/useInputMask';
import { AdminEntityAction, AdminEntityActionTypes, IAdminEntityState } from './adminEntityTypes';

const { formatPhone } = useInputMask();

export const initialState:IAdminEntityState = {
    entity: {
        id: '',
        name: '',
        slug: '',
        locationName: '',
        typeId: '',
        type: '',
        manufacturerId: '',
        manufacturer: '',
        phoneNumber: '',
        comment: '',
        address: '',
    },
    errors: {},
    isUpdate: false,
}
export function adminEntityReducer(
    state: IAdminEntityState,
    action: AdminEntityAction,
): IAdminEntityState {
    switch (action.type) {
      case AdminEntityActionTypes.SET_ENTITY: {
        if (action.payload.phoneNumber) {
          return {
            ...state,
            entity: {
              ...state.entity,
              ...action.payload,
              phoneNumber: formatPhone(
                action?.payload?.phoneNumber,
                state?.entity?.phoneNumber || ''
              ),
            },
          };
        }
        return { ...state, entity: { ...state.entity, ...action.payload } };
      }
      case AdminEntityActionTypes.RESET_ENTITY: {
        return { ...state, entity: { ...initialState.entity } };
      }
      case AdminEntityActionTypes.SET_ERROR: {
        return { ...state, errors: action.payload };
      }
      case AdminEntityActionTypes.RESET_ERROR: {
        return { ...state, errors: {} };
      }
      case AdminEntityActionTypes.SET_IS_UPDATE: {
        return { ...state, isUpdate: action.payload };
      }
      default:
        return state;
    }
}

