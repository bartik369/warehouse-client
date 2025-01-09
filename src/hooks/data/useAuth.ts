import { useState, useCallback } from "react";
import { ISignin } from "../../types/user";
import { AuthValidateField } from "../../utils/validation/AuthValidate";

export const useAuth = () => {
    const [authData, setAuthData] = useState<ISignin>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<Partial<ISignin>>({});
    
    const userHandler = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target as {name: keyof ISignin, value: string}
        setAuthData((prev) => ({
          ...prev,
          [name]: value
        }));
  
        const validationErrors = AuthValidateField(name);
        setErrors((prev) => ({
          ...prev,
          [name]: validationErrors
        }));
      }, []);
      
      return {authData, errors, setErrors, setAuthData, userHandler}
}
