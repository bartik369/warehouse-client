import { useInputMask } from '@/hooks/data/useInputMask';
import { AdminEntityAction, AdminEntityActionTypes, AdminEntityState } from './adminEntityTypes';

const { formatPhone } = useInputMask();

export const initialState:AdminEntityState = {
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
    media: {
      file: null,
      prevImg: null,
    },
}
export function adminEntityReducer(
    state: AdminEntityState,
    action: AdminEntityAction,
): AdminEntityState {
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
      case AdminEntityActionTypes.SET_FILE:
            return {
              ...state,
              media: {
                ...state.media,
                file: action.payload,
              },
            };
          case AdminEntityActionTypes.RESET_FILE:
            return {
              ...state,
              media: {
                ...state.media,
                file: null,
              },
            };
          case AdminEntityActionTypes.SET_PREVIEW:
            return {
              ...state,
              media: {
                ...state.media,
                prevImg: action.payload,
              },
            };
          case AdminEntityActionTypes.RESET_PREVIEW:
            return {
              ...state,
              media: {
                ...state.media,
                prevImg: null,
              },
            };
      default:
        return state;
    }
}

