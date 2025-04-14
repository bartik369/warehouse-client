import { useCallback, useState } from 'react';
import { IUser } from '../../types/user';
import { toast } from 'react-toastify';
import { useCreateUserMutation } from '../../store/api/userApi';
import { FormValidation, ValidateField } from '../../utils/validation/UserValidation';
import { handleApiError } from '../../utils/errors/handleApiError';

export const useAddUser = () => {
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
    location: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createUser] = useCreateUserMutation();
  const [checked, setChecked] = useState(true);

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
  

  const handleCreateUser = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        const validateErrors = FormValidation(user);
        console.log(validateErrors);
        
        setErrors(validateErrors as Record<string, string>);
        if (Object.values(validateErrors).length === 0) {
          if (!user) return;
          const updateData = {
            ...user,
          };
          await createUser(updateData)
            .unwrap()
            .then((data) => {
              toast(data?.message, { type: 'success' });
            });
        }
      } catch (err) {
       handleApiError(err);
      }
    },[]);
    
    const resetUser = () => {

    }
    const handleDepartmentChange = useCallback((item: any) => {
          handleInputChange('department', item.name || '');
    }, [handleInputChange]);

    const handleLocationChange = useCallback((item: any) => {
      handleInputChange('location', item.name || '');
}, [handleInputChange]);

    const handleChecked = useCallback(() => {
      setChecked(!checked);
      setUser((prev) => ({
        ...prev,
        isActive: !checked,
      }));
    }, [checked]);
    
  return { user, errors, checked, handleChecked, handleInputChange, 
    handleCreateUser, resetUser, handleDepartmentChange, handleLocationChange };
};
