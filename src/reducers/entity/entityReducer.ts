import { EntityAction, EntityActionTypes, EntityState } from "./entityTypes";

export const initialState: EntityState = {
  entity: {
    id: "",
    name: "",
    slug: "",
    imagePath: "",
    typeId: "",
    manufacturerId: "",
  },
  media: {
    file: null,
    prevImg: null,
  },
  errors: {},
};

export function entityReducer(
  state: EntityState,
  action: EntityAction
): EntityState {
  switch (action.type) {
    case EntityActionTypes.SET_ENTITY:
      return {
        ...state,
        entity: { ...state.entity, ...action.payload },
      };
    case EntityActionTypes.RESET_ENTITY:
      return { ...state, entity: { ...initialState.entity } };
    case EntityActionTypes.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };
    case EntityActionTypes.RESET_ERROR:
      return { ...state, errors: {} };
    case EntityActionTypes.SET_FILE:
      return {
        ...state,
        media: {
          ...state.media,
          file: action.payload,
        },
      };
    case EntityActionTypes.RESET_FILE:
      return {
        ...state,
        media: {
          ...state.media,
          file: null,
        },
      };
    case EntityActionTypes.SET_PREVIEW:
      return {
        ...state,
        media: {
          ...state.media,
          prevImg: action.payload,
        },
      };
    case EntityActionTypes.RESET_PREVIEW:
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
