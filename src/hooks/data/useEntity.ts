import { useRef, useCallback, useReducer } from 'react';
import { IEntity} from './../../types/devices';
import { EntityValidation, ValidateField } from '../../utils/validation/DeviceValidation';
import { useCreateTypeMutation } from '../../store/api/typesApi';
import { useCreateModelMutation } from '../../store/api/modelsApi';
import { useCreateManufacturerMutation } from '../../store/api/manufacturersApi';
import { selectPic } from '../../utils/constants/constants';
import { toast } from 'react-toastify';
import { handleApiError } from '../../utils/errors/handleApiError';
import { entityReducer, initialState } from '../../reducers/entity/entityReducer';
import { EntityActionTypes } from '../../reducers/entity/entityTypes';

export const useEntity = () => {
  const [state, dispatch] = useReducer(entityReducer, initialState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [createManufacturer] = useCreateManufacturerMutation();
  const [createType] = useCreateTypeMutation();
  const [createModel] = useCreateModelMutation();

  // Device media logic
  const handleMedia = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.type.startsWith("image/") && !file.type.endsWith(".gif")) {
          const objectUrl = URL.createObjectURL(file);
          dispatch({ type: EntityActionTypes.SET_FILE, payload: file });
          dispatch({ type: EntityActionTypes.SET_PREVIEW, payload: objectUrl });
          // setMedia({ file: file, prevImg: objectUrl });
          return () => URL.revokeObjectURL(objectUrl);
        } else {
          toast(selectPic, { type: "error" });
        }
      }
    },
    []
  );

  // Mapping between field type and RTK Query API handlers
  const entityPoolsFunctions: Record<
    string,
    (entity: any) => { unwrap: () => Promise<any> }
  > = {
    manufacturer: createManufacturer,
    type: createType,
    model: createModel,
  };

  const handleCreateEntity = useCallback(
    async (fieldType: string | null) => {
      try {
        if (!fieldType) return;
        const createEntityFunction = entityPoolsFunctions[fieldType];
        const validationErrors = EntityValidation(state.entity);
        dispatch({ type: EntityActionTypes.SET_ERROR, payload: validationErrors});

        if (Object.keys(validationErrors).length === 0) {
          const formData = new FormData();
          (Object.keys(state.entity) as (keyof IEntity)[]).forEach((key) => {
            const value = state.entity[key];
            if (value !== undefined && value !== null)
              formData.append(key, value);
          });
          if (state.media.file) formData.append("file", state.media.file);
          const data = await createEntityFunction(formData).unwrap();
          if (data) {
            handleResetEntity();
            toast(data?.message, { type: "success" });
          }
        }
      } catch (err: unknown) {
        handleApiError(err);
      }
    },
    [state.entity]
  );

  const handleResetEntity = useCallback(() => {
    dispatch({ type: EntityActionTypes.RESET_ENTITY });
    dispatch({ type: EntityActionTypes.RESET_FILE });
    dispatch({ type: EntityActionTypes.RESET_PREVIEW });
    dispatch({ type: EntityActionTypes.RESET_ERROR });
  }, []);

  const handleInputChange = useCallback(
    <T extends IEntity | string>(field: keyof IEntity, value: T) => {
      const validationErrors = ValidateField(field, value);
      dispatch({ 
        type: EntityActionTypes.SET_ERROR, 
        payload: { [field]: validationErrors as string }
      });
      dispatch({
        type: EntityActionTypes.SET_ENTITY,
        payload: { [field]: value as string }
      })
    },
    []
  );
  return {
    state,
    fileInputRef,
    actions: {
      handleMedia,
      handleInputChange,
      handleCreateEntity,
      handleResetEntity,
    },
  };
};


