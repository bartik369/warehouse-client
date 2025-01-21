import { useState, useCallback, useRef } from "react";
import { ModelValidation, ModelValidationField} from "./../../utils/validation/DeviceValidation";
import { useCreateDeviceModelMutation } from "../../store/api/devicesApi";
import { IDeviceMedia, IDeviceModel, ISelectedItem } from "../../types/devices";
import { isErrorWithMessage, isFetchBaseQueryError} from "../../helpers/error-handling";
import { toast } from "react-toastify";

export const useAddDeviceModel = () => {
  const [itemType, setItemType] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string;
  }>({});

  const [model, setModel] = useState<IDeviceModel>({
    name: "",
    manufacturer: "",
    type: "",
  });
  const [media, setMedia] = useState<IDeviceMedia>({
    file: null,
    prevImg: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createModel] = useCreateDeviceModelMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleMedia = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.type.startsWith("image/") && !file.type.endsWith(".gif")) {
          const objectUrl = URL.createObjectURL(file);
          setMedia({ file: file, prevImg: objectUrl });
          return () => URL.revokeObjectURL(objectUrl);
        } else {
          toast("Выберите картинку!", { type: "error" });
        }
      }
    },
    [media]
  );

  const handleCreateModel = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        const validationErrors = ModelValidation(model);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
          const formData = new FormData();
          (Object.keys(model) as (keyof IDeviceModel)[]).forEach((key) => {
            const value = model[key];
            if (value !== undefined && value !== null) {
              formData.append(key, value);
            }
          });

          if (media.file) formData.append("file", media.file);
          console.log(media.file);
          await createModel(formData)
            .unwrap()
            .then((data) => {
              handleResetModel();
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
    [model, media]
  );

  const handleResetModel = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.value = "";

    setMedia({
      ...media,
      file: null,
      prevImg: null,
    });
    setModel({
      ...model,
      name: "",
      manufacturer: "",
    });
    setSelectedValues({});
  }, []);

  const handleInputChange = useCallback(
    <T extends string | ISelectedItem>(field: keyof IDeviceModel, value: T) => {
      const validationErrors = ModelValidationField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: validationErrors as string,
      }));
      const inputValue = typeof value === "string" ? value : value.value;
      const selectValue = typeof value === "string" ? value : value.name;
      setModel((prev) => ({
        ...prev,
        [field]: inputValue,
      }));
      setSelectedValues((prev) => ({
        ...prev,
        [field]: selectValue,
      }));
    },[]
  );

  return { model, media, errors, fileInputRef, itemType, selectedValues,
    setItemType, setModel, handleInputChange, handleMedia, handleCreateModel, handleResetModel};
};
