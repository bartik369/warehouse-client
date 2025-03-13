import { useCallback, useState } from "react";
import { IUser } from "../../types/user";
import { toast } from "react-toastify";
import { useCreateUserMutation } from "../../store/api/userApi";
import { FormValidation, ValidateField } from "../../utils/validation/UserValidation";
import { isErrorWithMessage, isFetchBaseQueryError} from "../../utils/errors/error-handling";

export const useAddUser = () => {
  const [user, setUser] = useState<IUser>({
    id: "",
    userName: "",
    email: "",
    workId: "",
    firstName: "",
    isActive: true,
    lastName: "",
    department: "",
    locationId: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createUser] = useCreateUserMutation();

  const handleInputChange = useCallback(
    <T extends string | IUser>(field: keyof IUser, value: T) => {
        console.log(field);
        console.log(value);
        
      const validateErrors = ValidateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: validateErrors as string,
      }));
      setUser((prev) => ({
        ...prev,
        [field]: value as string,
      }));
    },
    []
  );
  console.log(user);
  

  const handleCreateUser = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        const validateErrors = FormValidation(user);
        setErrors(validateErrors as Record<string, string>);
        if (Object.values(validateErrors).length === 0) {
          if (!user) return;
          const updateData = {
            ...user,
            userName: user.userName,
            email: user.email,
            workId: user.workId,
            firstName: user.firstName,
            lastName: user.lastName,
            department: user.department,
          };
          await createUser(updateData)
            .unwrap()
            .then((data) => {
              toast(data?.message, { type: "success" });
            });
        }
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const error = err as { data?: { message: string; error: string } };
          const errMsg = error.data?.message;
          console.log("API Error", errMsg);
          toast(errMsg, { type: "error" });
        } else if (isErrorWithMessage(err)) {
          console.log("Unexpected Error:", err.message);
        } else {
          console.error("Unknown Error:", err);
        }
      }
    },[]);
    
    const resetUser = () => {

    }
     const handleDepartmentChange = useCallback((item: any) => {
          handleInputChange("department", item.name || '');
    }, [handleInputChange]);
    
  return { user, errors, handleInputChange, handleCreateUser, resetUser, handleDepartmentChange };
};
