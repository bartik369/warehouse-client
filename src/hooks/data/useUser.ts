import { useCallback, useState } from 'react';
import { IUser } from '../../types/user';
import { toast } from 'react-toastify';
import { useCreateUserMutation } from '../../store/api/userApi';
import { FormValidation, ValidateField } from '../../utils/validation/UserValidation';
import { handleApiError } from '../../utils/errors/handleApiError';
import { useNavigate } from 'react-router-dom';

export const useUser = () => {
  const [user, setUser] = useState<IUser>({
    id: '',
    userName: '',
    email: '',
    workId: '',
    firstNameRu: '',
    lastNameRu: '',
    firstNameEn: '',
    lastNameEn: '',
    isActive: true,
    department: '',
    departmentId: '',
    location: '',
    locationId: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(true);
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const handleInputChange = useCallback(
    <T extends string | IUser>(field: keyof IUser, value: T) => {
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

  const handleGetUser = (id: string) => {
    navigate(`/users/${id}`)
  }
  

  const handleCreateUser = useCallback(async () => {
      try {
        const validateErrors = FormValidation(user);
        console.log(validateErrors);
        
        setErrors(validateErrors as Record<string, string>);
        if (Object.values(validateErrors).length === 0) {
          if (!user) return;
          const updateData = {
            ...user,
          };
          const data = await createUser(updateData).unwrap();
          if (data) {
            toast(data?.message, { type: 'success' });
          }
        }
      } catch (err) {
       handleApiError(err);
      }
    },[user]);
    
    const resetUser = () => {

    }

    const handleChecked = useCallback(() => {
      setChecked(!checked);
      setUser((prev) => ({
        ...prev,
        isActive: !checked,
      }));
    }, [checked]);
    
  return { user, errors, checked, handleChecked, handleInputChange, 
    handleCreateUser, resetUser, handleGetUser };
};
