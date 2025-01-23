import { IEntity} from './../../types/devices';
import { useState, useCallback} from "react";
import { EntityValidation, ValidateField } from '../../utils/validation/DeviceValidation';
import { isErrorWithMessage, isFetchBaseQueryError} from "../../helpers/error-handling";
import { useCreateManufacturerMutation, useCreateTypeMutation, useCreateModelMutation } from "../../store/api/devicesApi";
import { toast } from "react-toastify";

export const useEntity = () => {
  const [entity, setEntity] = useState<IEntity>({
    id: '',
    name: '',
    slug: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createManufacturer] = useCreateManufacturerMutation();
  const [createType] = useCreateTypeMutation();
  const [createModel] = useCreateModelMutation();

  // Mapping between field type and RTK Query API handlers
  const entityPoolsFunctions: Record<string, (entity: IEntity) => { unwrap: () => Promise<any> }> = {
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
          await createEntityFunction(entity).unwrap()
          .then((data) => {
            handleResetEntity();
            toast(data?.message, { type: "success" });
          });
        }
      } catch (err: unknown) {
        
        if (isFetchBaseQueryError(err)) {
          const error = err as { data?: { message: string; error: string } };
          const errMsg = error.data?.error;
          console.log("API Error", errMsg);
          toast(errMsg, { type: "error" });
        } else if (isErrorWithMessage(err)) {
          console.log("Unexpected Error:", err.message);
        } else {
          console.error("Unknown Error:", err);
        }
      }
    },
    [entity]
  );

  const handleResetEntity = useCallback(() => {
    setEntity({
      ...entity,
      id: '',
      name: '',
      slug: ''
    });
  }, []);

  const handleInputChange = useCallback((field: keyof IEntity, value: string) => {
      const validationErrors = ValidateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: validationErrors as any,
      }));

      setEntity((prev: any) => ({
        ...prev,
        [field]: value,
      }));
    },[]
  );

  return {errors, entity, handleInputChange, 
    handleCreateEntity, handleResetEntity};
};

