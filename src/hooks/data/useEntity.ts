import { useState, useRef, useCallback } from 'react';
import { IDeviceMedia, IEntity} from './../../types/devices';
import { EntityValidation, ValidateField } from '../../utils/validation/DeviceValidation';
import { isErrorWithMessage, isFetchBaseQueryError} from '../../utils/errors/error-handling';
import { useCreateTypeMutation, useCreateModelMutation } from '../../store/api/devicesApi';
import { useCreateManufacturerMutation } from '../../store/api/manufacturersApi';
import { selectPic } from '../../utils/constants/constants';
import { toast } from 'react-toastify';

export const useEntity = () => {
  // Device file and preview img for  Device form
  const [media, setMedia] = useState<IDeviceMedia>({
    file: null,
    prevImg: null,
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [entity, setEntity] = useState<IEntity>({
    id: '',
    name: '',
    slug: '',
    imagePath: '',
    typeId: '',
    manufacturerId: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createManufacturer] = useCreateManufacturerMutation();
  const [createType] = useCreateTypeMutation();
  const [createModel] = useCreateModelMutation();

  // Device media logic
  const handleMedia = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.type.startsWith('image/') && !file.type.endsWith('.gif')) {
          const objectUrl = URL.createObjectURL(file);
          setMedia({ file: file, prevImg: objectUrl });
          return () => URL.revokeObjectURL(objectUrl);
        } else { toast(selectPic, { type: 'error' }); }
      }
    },
    [media]
  );
  
  // Mapping between field type and RTK Query API handlers
  const entityPoolsFunctions: Record<string, (entity: any) => { unwrap: () => Promise<any> }> = {
    manufacturer: createManufacturer,
    type: createType,
    model: createModel,
  };

  const handleCreateEntity = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>, fieldType:string) => {
      e.preventDefault();
      try {
        const createEntityFunction = entityPoolsFunctions[fieldType]
        const validationErrors = EntityValidation(entity);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
          const formData = new FormData();
          (Object.keys(entity) as (keyof IEntity)[]).forEach((key) => {
            const value = entity[key];
            if (value !== undefined && value !== null) formData.append(key, value);
          });
          if (media.file) formData.append('file', media.file);
          await createEntityFunction(formData).unwrap().then((data) => {
            handleResetEntity();
            toast(data?.message, { type: 'success' });
          });
        }
      } catch (err: unknown) {

        if (isFetchBaseQueryError(err)) {
          const error = err as { data?: { message: string; error: string } };
          const errMsg = error.data?.message;
          console.log('API Error', errMsg);
          toast(errMsg, { type: 'error' });
        } else if (isErrorWithMessage(err)) {
          console.log('Unexpected Error:', err.message);
        } else {
          console.error('Unknown Error:', err);
        }
      }
    },
    [entity, EntityValidation]
  );

  const handleResetEntity = useCallback(() => {
    setEntity({ id: '', name: '', slug: '', imagePath: '', typeId: ''});
    setMedia({ file: null, prevImg: null})
  }, []);

  const handleInputChange = useCallback(<T extends IEntity | string>(field: keyof IEntity, value: T) => {
      const validationErrors = ValidateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: validationErrors as string,
      }));
      setEntity((prev) => ({
        ...prev,
        [field]: value as string,
      }));
    },[]
  );
  return { errors, entity, media, fileInputRef, setEntity, handleMedia, 
  handleInputChange,  handleCreateEntity, handleResetEntity };
};


